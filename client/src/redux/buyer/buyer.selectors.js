import { createSelector } from "reselect";

const selectBuyer = state => state.buyer;

export const selectCurrentBuyer = createSelector(
  [selectBuyer],
  buyer => buyer.currentBuyer
);

export const selectBuyerLoadingStatus = createSelector(
    [selectBuyer],
    buyer => buyer.isLoading
);

export const selectBuyerError = createSelector(
    [selectBuyer],
    buyer => buyer.buyerError
);
