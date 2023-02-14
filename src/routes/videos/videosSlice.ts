/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import apiFetch, { IApiFetchParams } from '../../utils/apiFetch';
import mockVideos from '../../mock/videos.json'
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

interface IVideo {
  [propName: string]: any;
}

interface IVideos {
  items: IVideo[];
  nextPageToken: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number
  };
  [propName: string]: any;
}

interface IState {
  status: "pending" | "error" | "fulfilled",
  data: {
    videos: IEmptySearch
  }
}

// THUNKS
export const fetchVideos = createAsyncThunk(
  'search/fetchVideos',
  async ({ channelId, rowsPerPage, pageToken }: { channelId: string, rowsPerPage: number, pageToken: string }) => {
    const request: IApiFetchParams = {
      kind: "search",
      params: `part=snippet&order=date&channelId=${channelId}&type=video&maxResults=${rowsPerPage}&pageToken=${pageToken}`,
    };
    return await apiFetch(request);
    // return await delay(mockVideos, 200)
  },
);

const initialState: IState = {
  status: 'pending',
  data: {
    videos: {
      items: [],
      pageInfo: {
        totalResults: 0
      }
    }
  }
};

// SLICE
export const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
export const selectVideos = (state: RootState): IVideos | IEmptySearch => state.videos.data.videos;

export default videosSlice.reducer;