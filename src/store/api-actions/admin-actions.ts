import type { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch, State } from '../../types/state';
import { APIRoute } from '../../const';
import type { IBidsData, IUpdateRoleResponse } from '@/types/bid-data';

export const fetchBidsAction = createAsyncThunk<IBidsData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'bid/fetchBids',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<IBidsData>(APIRoute.Bid);
    return data;
  }
);

export const updateRoleAction = createAsyncThunk<void, IUpdateRoleResponse, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance
}>(
  'bid/updateRole',
  async ({ idUser, role }, { extra: api }) => {
    await api.post(APIRoute.Role, { idUser, role });
  }
);
