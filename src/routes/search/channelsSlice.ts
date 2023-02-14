/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import apiFetch, { IApiFetchParams } from '../../utils/apiFetch';
import mockChannels from '../../mock/channels.json';
import mockChannel from '../../mock/channel.json';
import { delay } from '../../mock/delay';

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
  id: any;
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
  [propName: string]: any;
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

interface IState {
  status: "pending" | "error" | "fulfilled",
  data: {
    channels: IChannels | IEmptySearch;
    channel: IChannels | IEmptySearch;
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
    // return await delay(mockChannels, 200)
  },
  );
  
  export const fetchChannel = createAsyncThunk(
    'search/fetchChannel',
    async (id: string) => {
      const request: IApiFetchParams = {
        kind: "channels",
        params: `part=snippet,statistics,brandingSettings&id=${id}`,
      };
      return await apiFetch(request);
      // return await delay(mockChannel, 200)
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
    channel: {
      items: [],
      pageInfo: {
        totalResults: 0
      }
    },
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
  },
});

// ACTIONS
export const selectChannels = (state: RootState): IChannels | IEmptySearch  => state.channels.data.channels;
export const selectChannel = (state: RootState): IChannels | IEmptySearch => state.channels.data.channel;

export default channelsSlice.reducer;