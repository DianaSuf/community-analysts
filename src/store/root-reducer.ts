import { combineReducers } from '@reduxjs/toolkit';
import { modalSlice } from './slices/modal-slice';
import { userSlice } from './slices/user-slice';
import { bidSlice } from './slices/bid-slice';
import { membersSlice } from './slices/members-slice';

export const rootReducer = combineReducers({
  [modalSlice.name]: modalSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [bidSlice.name]: bidSlice.reducer,
  [membersSlice.name]: membersSlice.reducer,
});
