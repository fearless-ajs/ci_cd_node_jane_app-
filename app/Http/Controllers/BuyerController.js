const catchAsync = require('./../../Exceptions/catchAsync');
// const factory = require('./../../Providers/FactoryServiceProvider');
const Controller = require('./Controller');
const AppError = require('./../../Exceptions/appError');
const BuyerModel = require('../../Models/Buyer');
const roleGuard = require('./RBAC/RoleUserController');
const Guard = require('./../../Providers/GuardServiceProvider');

class BuyerController extends Controller{
    constructor() {
        super();
    }

    //Creates New Business Account
    createBuyer = catchAsync(async (req, res, next) => {
        req.body.user = req.user._id
        const doc = await BuyerModel.create(req.body);

        //Attach Business Role to the user
        const role = await roleGuard.attachRoleWithName(req.user._id, 'buyer');

        res.status(201).json({
            status: 'success',
            data: {
                role:role,
                data: doc
            }
        });
    });

    //Returns the list of all Businesses
    getAllBuyers = this.getAll(BuyerModel);

    //Returns The Buyer with the given Id
    getBuyer = this.getOne(BuyerModel);

    //Updates the buyer with the given Id
    updateBuyer = catchAsync(async (req, res, next) => {
        //1.Verify if the account exists
        const account = await BuyerModel.findById(req.params.id);
        if (!account){
            return next(new AppError('No business found with that id', 404));
        }

        //2.Verify if the current User Owns the account
        if (account.user._id.toString() !== req.user._id.toString()){
            return next(new AppError('You are not Authorized to perform this update', 404));
        }

        //3. Perform the Account update
        const doc = await BuyerModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true, //To return the updated version of the document
            runValidators: true // To validate inputs based on the Business schema
        });

        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    });

    //Deletes the Business with given Id
    deleteBuyer = this.deleteOne(BuyerModel);

    fetchMe = catchAsync(async (req, res, next) => {

        // 3) Update user document
        const buyer = await BuyerModel.findOne({ user: req.user.id })
        if (!buyer){
            //Send a null response
            return res.status(200).json({
                status: 'success',
                buyer: null
            });
        }

        return res.status(200).json({
            status: 'success',
            buyer: {
                ...buyer._doc
            }
        });

    });

    fetchUserBuyerProfile = catchAsync(async (req, res, next) => {

        // 3) Update user document
        const buyer = await BuyerModel.findOne({ user: req.params.userId })
        if (!buyer){
            //Send a null response
            return res.status(200).json({
                status: 'success',
                buyer: null
            });
        }

        return res.status(200).json({
            status: 'success',
            buyer: {
                ...buyer._doc
            }
        });

    });

    updateUserBuyerProfile = catchAsync(async (req, res, next) => {
        //1.Verify if the account exists
        const account = await BuyerModel.findOne({ user: req.params.userId });

        if (!account){
            return next(new AppError('No buyer found with that id', 404));
        }
        //2.Verify if the current User Owns the account or an Admin
        if ((account.user._id.toString() !== req.user._id.toString()) && (await Guard.hasRoles(['administrator', 'super-administrator'], req.user._id)) === false ){
            return next(new AppError('You are not Authorized to perform this update', 404));
        }

        //3. Perform the Account update
        const doc = await BuyerModel.findOneAndUpdate({ user: req.params.userId }, req.body, {
            new: true, //To return the updated version of the document
            runValidators: true // To validate inputs based on the Business schema
        });

        return res.status(200).json({
            status: 'success',
            buyer: {
                ...doc._doc
            }
        });

    });


}
module.exports = new BuyerController;