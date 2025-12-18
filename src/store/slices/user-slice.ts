import { createSlice } from "@reduxjs/toolkit";
import { AuthorizationStatus, type AuthorizationStatusType } from "../../const";
import { checkAuthAction } from "../api-actions";

type UserState = {
  authorizationStatus: AuthorizationStatusType;
  isLoading: boolean;
}

const initialState: UserState  = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  isLoading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      state.authorizationStatus = AuthorizationStatus.UNKNOWN;
    },
  },
  selectors: {
    getAuthorizationStatus: (store) => store.authorizationStatus,
    getAuthLoadingStatus: (store) => store.isLoading,
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = action.payload;
        state.isLoading = false;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.UNKNOWN;
        state.isLoading = false;
      });
  }
});

export const { logoutUser } = userSlice.actions;

export const { getAuthorizationStatus, getAuthLoadingStatus } = userSlice.selectors;