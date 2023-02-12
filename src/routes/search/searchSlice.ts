/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import apiFetch, { IApiFetchParams } from '../../utils/apiFetch';

interface IState {
  status: "pending" | "error" | "fulfilled",
  data: {
    channels: any[],
    channel: any,
    pages: {
      current: string,
      prev: string,
      next: string
    }
  }
}

export const fetchChannels = createAsyncThunk(
  'search/fetchChannels',
  async () => {
  const request: IApiFetchParams = {
    url: {
      kind: "channels",
      params: "part=snippet,contentDetails,statistics,status&forUsername=game",
    },
    method: "GET",
  };
    return await apiFetch(request);
  },
);

export const fetchChannel = createAsyncThunk(
  'search/fetchChannel',
  async (id) => {
    //TODO: SEARCH CHANNEL BY ID
    const request: IApiFetchParams = {
      url: {
        kind: "channels",
        params: "part=snippet,contentDetails,statistics,status&forUsername=game",
      },
      method: "GET",
    };
    return await apiFetch(request);
  },
);

const initialState: IState = {
  status: 'pending',
  data: {
    channels: [],
    channel: {},
    pages: {
      current: '',
      prev: '',
      next: ''
    },
  }
};

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

export const selectChannels = (state: RootState) => state.channels.data.channels;
export const selectChannel = (state: RootState) => state.channels.data.channel;

export default channelsSlice.reducer;