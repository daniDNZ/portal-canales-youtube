/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import apiFetch, { IApiFetchParams } from '../../utils/apiFetch';

// INTERFACES 
type Thumbnail = {
  url: string
}

interface IEmptySearch {
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
interface IVideos {
  items: IChannel[];
  nextPageToken: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number
  };
  [propName: string]: any;
}

//TODO: VIDEOS INTERFACE

interface IState {
  status: "pending" | "error" | "fulfilled",
  data: {
    channels: IChannels | IEmptySearch;
    channel: IChannel | {};
    videos: IEmptySearch
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
  async ({ channelId, rowsPerPage, pageToken }: { channelId: string, rowsPerPage: number, pageToken: string }) => {
    const request: IApiFetchParams = {
      kind: "search",
      params: `part=snippet&idChannel=${channelId}&type=video&maxResults=${rowsPerPage}&pageToken=${pageToken}`,
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
    videos: {
      items: [],
      pageInfo: {
        totalResults: 0
      }
    }
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
        if (Object.entries(action.payload).length > 0) {
          state.data.channels = action.payload;
        }
      })
      .addCase(fetchChannels.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchChannel.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchChannel.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        if (Object.entries(action.payload).length > 0) {
          state.data.channel = action.payload;
        }
      })
      .addCase(fetchChannel.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchVideos.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        if (Object.entries(action.payload).length > 0) {
          state.data.videos = action.payload;
        }
      })
      .addCase(fetchVideos.rejected, (state) => {
        state.status = 'error';
      })
  },
});

// ACTIONS
export const selectChannels = (state: RootState): IChannels | IEmptySearch  => state.channels.data.channels;
export const selectChannel = (state: RootState): IChannel | {} => state.channels.data.channel;
export const selectVideos = (state: RootState): IVideos | IEmptySearch => state.channels.data.videos;

export default channelsSlice.reducer;