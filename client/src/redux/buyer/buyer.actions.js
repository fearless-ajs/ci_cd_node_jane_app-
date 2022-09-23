import { BuyerActionTypes } from "./buyer.types";

export const fetchCurrentBuyerProfileStart = userId => ({
   type: BuyerActionTypes.FETCH_CURRENT_BUYER_PROFILE_START,
   payload: userId
});

export const fetchCurrentBuyerProfileSuccess = buyerProfileData => ({
   type: BuyerActionTypes.FETCH_CURRENT_BUYER_PROFILE_SUCCESS,
   payload: buyerProfileData
});

export const fetchCurrentBuyerProfileFailure = error => ({
   type: BuyerActionTypes.FETCH_CURRENT_BUYER_PROFILE_FAILURE,
   payload: error
});

export const fetchUserBuyerProfileStart = userId => ({
   type: BuyerActionTypes.FETCH_USER_BUYER_PROFILE_START,
   payload: userId
});

export const fetchUserBuyerProfileSuccess = buyerProfileData => ({
   type: BuyerActionTypes.FETCH_USER_BUYER_PROFILE_SUCCESS,
   payload: buyerProfileData
});

export const fetchUserBuyerProfileFailure = error => ({
   type: BuyerActionTypes.FETCH_USER_BUYER_PROFILE_FAILURE,
   payload: error
});

export const updateBuyerProfileStart = ( { formData, userId } )=> ({
   type: BuyerActionTypes.UPDATE_USER_BUYER_PROFILE_START,
   payload: { formData, userId }
});

export const updateBuyerProfileSuccess = updatedProfile => ({
   type: BuyerActionTypes.UPDATE_USER_BUYER_PROFILE_SUCCESS,
   payload: updatedProfile
});

export const updateBuyerProfileFailure = error => ({
   type: BuyerActionTypes.UPDATE_USER_BUYER_PROFILE_FAILURE,
   payload: error
});
