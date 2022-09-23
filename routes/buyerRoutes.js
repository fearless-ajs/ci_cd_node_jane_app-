const express = require('express');
const BuyerController = require('./../app/Http/Controllers/BuyerController');
const Guard = require('./../app/Providers/GuardServiceProvider');

const router = express.Router();

router.route('/')
    .get(Guard.authGuard,
        Guard.restrictToRoles(['administrator', 'super-administrator']),
        BuyerController.getAllBuyers)
    .post(Guard.authGuard,
        BuyerController.createBuyer);

router.route('/:id')
    .get(Guard.authGuard, BuyerController.getBuyer)
    .delete(Guard.authGuard,
        BuyerController.deleteBuyer)
    .patch(Guard.authGuard,
        BuyerController.updateBuyer);

router.route('/account/me')
    .get(Guard.authGuard, Guard.restrictToRoles(['administrator', 'super-administrator', 'buyer']) , BuyerController.fetchMe )

router.route('/user-account/:userId')
    .get(Guard.authGuard, BuyerController.fetchUserBuyerProfile )
    .patch(Guard.authGuard,
        Guard.restrictToRoles(['administrator', 'super-administrator', 'buyer']),
        BuyerController.updateUserBuyerProfile)



module.exports = router;