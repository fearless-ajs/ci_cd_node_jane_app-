import { BuyerActionTypes } from "./buyer.types";

const INITIAL_STATE = {
    currentBuyer: null,
    isLoading: false,
    buyerError: null,
}

const buyerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BuyerActionTypes.UPDATE_CURRENT_BUYER_PROFILE_START:
        case BuyerActionTypes.UPDATE_USER_BUYER_PROFILE_START:
        case BuyerActionTypes.FETCH_CURRENT_BUYER_PROFILE_START:
            return {
                ...state,
                isLoading: true
            }
        case BuyerActionTypes.UPDATE_USER_BUYER_PROFILE_SUCCESS:
            return {
                ...state,
                isLoading: true
            }
        case BuyerActionTypes.UPDATE_CURRENT_BUYER_PROFILE_SUCCESS:
        case BuyerActionTypes.FETCH_CURRENT_BUYER_PROFILE_SUCCESS:
            return {
                ...state,
                currentBuyer: action.payload,
                buyerError: null,
                isLoading: false
            }
        case BuyerActionTypes.UPDATE_CURRENT_BUYER_PROFILE_FAILURE:
        case BuyerActionTypes.UPDATE_USER_BUYER_PROFILE_FAILURE:
        case BuyerActionTypes.FETCH_CURRENT_BUYER_PROFILE_FAILURE:
            return {
                ...state,
                buyerError: action.payload,
                isLoading: false
            }

        default:
            return state;
    }
}

export default buyerReducer;