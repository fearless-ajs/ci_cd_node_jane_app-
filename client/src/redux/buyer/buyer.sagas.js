import { takeLatest, put, all, call } from 'redux-saga/effects';

import { BuyerActionTypes } from "./buyer.types";
import { UserActionTypes } from "../user/user.types";
import Buyer from "../../backend/Buyer";
import Notify from "../../utils/Notify";
import {
    fetchCurrentBuyerProfileFailure,
    fetchCurrentBuyerProfileSuccess, updateBuyerProfileFailure,
    updateBuyerProfileStart
} from "./buyer.actions";


/** ------------------------------------------------------------------- **/
// Asynchronous logic/ other controllers
// Payload automatically comes in as an object
/** ------------------------------------------------------------------- **/
export function* fetchCurrentBuyerProfile() {
    try {
        const buyerInfo = yield Buyer.fetchMyBuyerProfile();
        yield put(fetchCurrentBuyerProfileSuccess(buyerInfo.data));
    }catch (error) {
        yield put(fetchCurrentBuyerProfileFailure(error))
        Notify.error("Unable to fetch your boyer profile")
    }
}

export function* updateBuyerProfile({ formData, userId }) {
    try{
        yield Buyer.updateBuyerProfile({ formData, userId });
        Notify.success("Business profile updated");
    }catch (error) {
        yield put(updateBuyerProfileFailure(error))
        Notify.error("Unable to update buyer profile")
    }
}

/** ------------------------------------------------------------------- **/
// LISTENERS
/** ------------------------------------------------------------------- **/
export function* onFetchCurrentBuyerProfile() {
    yield takeLatest(BuyerActionTypes.FETCH_CURRENT_BUYER_PROFILE_START, fetchCurrentBuyerProfile)
}

export function* onUpdateUserBuyerProfile() {
    yield takeLatest(BuyerActionTypes.FETCH_USER_BUYER_PROFILE_START, updateBuyerProfile)
}

export function* onSignInSuccess() {
    yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, fetchCurrentBuyerProfile)
}

export function* buyerSagas() {
    yield all([
        call(onSignInSuccess),
        call(onFetchCurrentBuyerProfile),
        call(onUpdateUserBuyerProfile)
    ])
}