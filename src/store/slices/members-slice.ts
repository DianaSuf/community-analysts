import { createSlice } from "@reduxjs/toolkit";
import { fetchMembersAction } from "../api-actions/members-actions";
import type { IMemberData } from "@/types/members-data";

type MembersState = {
  users: IMemberData[];
  count: number;
  isLoading: boolean;
}

const initialState: MembersState = {
  users: [],
  count: 0,
  isLoading: false,
};

export const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {},
  selectors: {
    getMembers: (state) => state.users,
    getMembersCount: (state) => state.count,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembersAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMembersAction.fulfilled, (state, action) => {
        if (action.payload) {
          state.users = action.payload.users;
          state.count = action.payload.count;
        }
        state.isLoading = false;
      })
      .addCase(fetchMembersAction.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { getMembers, getMembersCount } = membersSlice.selectors;

