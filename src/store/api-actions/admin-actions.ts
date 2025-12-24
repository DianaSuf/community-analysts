import type { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch, State } from '../../types/state';
import { APIRoute } from '../../const';
import type { IBidsData } from '@/types/admin-data';

export const fetchBidsAction = createAsyncThunk<IBidsData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchBids',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<IBidsData>(APIRoute.Bid);
    return data;
  }
);
