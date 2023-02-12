/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import apiFetch, { IApiFetchParams } from '../../utils/apiFetch';

// INTERFACES 
type Thumbnail = {
  url: string
}

interface IEmptyChannels {
  nextPageToken?: string;
  prevPageToken?: string;
  items: [];
  pageInfo: {
    totalResults: number;
  };
}
interface IChannel {
  etag: string
  id: { kind: string; channelId: string}
  kind: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent:any;
    publishTime: string;
    publishedAt: string;
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail
    };
    title: string;
  }
}

interface IChannels {
  etag: string;
  items: IChannel[];
  kind: string;
  nextPageToken: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number
  };
  regionCode: string;
}

//TODO: VIDEOS INTERFACE

interface IState {
  status: "pending" | "error" | "fulfilled",
  data: {
    channels: IChannels | IEmptyChannels;
    channel: IChannel | {};
    videos: {}
  }
}

// THUNKS
export const fetchChannels = createAsyncThunk(
  'search/fetchChannels',
  async ({searchTerm, rowsPerPage, pageToken}:{searchTerm: string, rowsPerPage: number, pageToken: string}) => {
  const request: IApiFetchParams = {
    kind: "search",
    params: `part=snippet&q=${searchTerm}&type=channel&maxResults=${rowsPerPage}&pageToken=${pageToken}`,
  };
    return await apiFetch(request);
  },
);

export const fetchChannel = createAsyncThunk(
  'search/fetchChannel',
  async (id: string) => {
    const request: IApiFetchParams = {
      kind: "search",
      params: `part=snippet,statistics&idChannel=${id}&type=channel`,
    };
    return await apiFetch(request);
  },
);

export const fetchVideos = createAsyncThunk(
  'search/fetchVideos',
  async ({ id, rowsPerPage, pageToken }: { id: string, rowsPerPage: number, pageToken: string }) => {
    const request: IApiFetchParams = {
      kind: "search",
      params: `part=snippet&idChannel=${id}&type=video&maxResults=${rowsPerPage}&pageToken=${pageToken}`,
    };
    return await apiFetch(request);
  },
);

const initialState: IState = {
  status: 'pending',
  data: {
    channels: {
      items: [],
      pageInfo: {
        totalResults: 0
      }
    },
    channel: {},
    videos: {}
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
        console.log(action.payload)
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
      .addCase(fetchVideos.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state) => {
        state.status = 'error';
      })
  },
});

// ACTIONS
export const selectChannels = (state: RootState): IChannels | IEmptyChannels  => state.channels.data.channels;
export const selectChannel = (state: RootState): IChannel | {} => state.channels.data.channel;
export const selectVideos = (state: RootState): {} => state.channels.data.videos;

export default channelsSlice.reducer;