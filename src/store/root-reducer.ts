import { combineReducers } from '@reduxjs/toolkit';
import { modalSlice } from './slices/modal-slice';

export const rootReducer = combineReducers({
  [modalSlice.name]: modalSlice.reducer,
});
