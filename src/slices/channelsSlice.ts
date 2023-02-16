/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import apiFetch, { IApiFetchParams } from '../utils/apiFetch';
import mockChannels from '../mock/channels.json';
import mockChannel from '../mock/channel.json';
import { delay } from '../mock/delay';
import { IApiResponse, IApiSpecificSearchResponse } from '../models/api';
import { LOAD_MOCK_DATA } from '../config';


interface IState {
  status: "pending" | "error" | "fulfilled",
  data: {
    channels: IApiResponse | undefined;
    channel: IApiSpecificSearchResponse | undefined;
  }
}

// THUNKS
export const fetchChannels = createAsyncThunk(
  'search/fetchChannels',
  async (searchTerm: string) => {
      const request: IApiFetchParams = {
        kind: "search",
        params: `part=snippet&q=${searchTerm}&type=channel&maxResults=10`,
      };

    if (LOAD_MOCK_DATA) {
      return await delay(mockChannels, 200) as IApiResponse | undefined;
    }
    console.log("hola");
    return await apiFetch(request) as IApiResponse | undefined;
  },
  );
  
  export const fetchChannel = createAsyncThunk(
    'search/fetchChannel',
    async (id: string) => {
      const request: IApiFetchParams = {
        kind: "channels",
        params: `part=snippet,statistics,brandingSettings&id=${id}`,
      };

      if (LOAD_MOCK_DATA) {
        return await delay(mockChannel, 200) as IApiSpecificSearchResponse | undefined;
      }
      return await apiFetch(request) as IApiSpecificSearchResponse | undefined;
  },
);

const initialState: IState = {
  status: 'pending',
  data: {
    channels: undefined,
    channel: undefined,
  }
};

// SLICE
export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.status = 'fulfilled';
          state.data.channels = action.payload;
      })
      .addCase(fetchChannels.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchChannel.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchChannel.fulfilled, (state, action) => {
        state.status = 'fulfilled';
          state.data.channel = action.payload;
      })
      .addCase(fetchChannel.rejected, (state) => {
        state.status = 'error';
      })
  },
});

// ACTIONS
export const selectChannels = (state: RootState): IApiResponse | undefined  => state.channels.data.channels;
export const selectChannel = (state: RootState): IApiSpecificSearchResponse | undefined => state.channels.data.channel;

export default channelsSlice.reducer;