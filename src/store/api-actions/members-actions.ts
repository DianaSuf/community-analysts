import type { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch, State } from '../../types/state';
import { APIRoute } from '../../const';
import type { IMembersData, IMembersParams } from '@/types/members-data';

export const fetchMembersAction = createAsyncThunk<IMembersData, IMembersParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'member/fetchMembers',
  async ({ search }, {extra: api}) => {
    const {data} = await api.get<IMembersData>(APIRoute.Members, {
      params: {
        nameFilter: search || ''
      }
    });
    return data;
  }
);
