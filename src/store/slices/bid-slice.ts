import { createSlice } from "@reduxjs/toolkit";
import { fetchBidsAction } from "../api-actions/admin-actions";
import type { IBid, IRejectedBid } from "@/types/bid-data";

type BidState = {
  newBid: IBid[];
  rejectedBid: IRejectedBid[];
  isLoading: boolean;
}

const initialState: BidState = {
  newBid: [],
  rejectedBid: [],
  isLoading: false,
};

export const bidSlice = createSlice({
  name: 'bid',
  initialState,
  reducers: {},
  selectors: {
    getNewBids: (state) => state.newBid,
    getRejectedBids: (state) => state.rejectedBid,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBidsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBidsAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.newBid = action.payload.newBid;
          state.rejectedBid = action.payload.rejectedBid;
        }
        state.isLoading = false;
      })
      .addCase(fetchBidsAction.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { getNewBids, getRejectedBids } = bidSlice.selectors;

