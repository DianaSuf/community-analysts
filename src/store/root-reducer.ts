import { combineReducers } from '@reduxjs/toolkit';
import { modalSlice } from './slices/modal-slice';
import { userSlice } from './slices/user-slice';

export const rootReducer = combineReducers({
  [modalSlice.name]: modalSlice.reducer,
  [userSlice.name]: userSlice.reducer,
});
