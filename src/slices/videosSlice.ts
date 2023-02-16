/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import apiFetch, { IApiFetchParams } from '../utils/apiFetch';
import mockVideos from '../mock/videos.json'
import mockVideosStats from '../mock/videoStatistics.json'
import { delay } from '../mock/delay';
import { IApiResponse, IApiSpecificSearchResponse } from '../models/api';
import { LOAD_MOCK_DATA } from '../config';

interface IState {
  status: "pending" | "error" | "fulfilled";
  data: {
    videos: IApiResponse | undefined;
    videosStats: IApiSpecificSearchResponse | undefined;
  }
}

const fetchVideosStats = async (ids: string[] | undefined) => {
  const statsRequest: IApiFetchParams = {
    kind: "videos",
    params: `part=id,player,statistics&id=${ids?.toString()}`,
  };

  return await apiFetch(statsRequest) as IApiSpecificSearchResponse | undefined;
}

// THUNKS
export const fetchVideos = createAsyncThunk(
  'search/fetchVideos',
  async ({ channelId, rowsPerPage, pageToken }: { channelId: string, rowsPerPage: number, pageToken: string }) => {
    const request: IApiFetchParams = {
      kind: "search",
      params: `part=snippet&order=date&channelId=${channelId}&type=video&maxResults=${rowsPerPage}&pageToken=${pageToken}`,
    };

    if (LOAD_MOCK_DATA) {
      const videos = await delay(mockVideos, 200) as IApiResponse | undefined;

      const videosStats = await delay(mockVideosStats, 200) as IApiSpecificSearchResponse | undefined;
      return {videos, videosStats}
    }
    const videos = await apiFetch(request) as IApiResponse | undefined;
    const ids = videos?.items.map(item => item.id.videoId || '')

    const videosStats = await fetchVideosStats(ids)
    return {videos, videosStats}
  },
);

const initialState: IState = {
  status: 'pending',
  data: {
    videos: undefined,
    videosStats: undefined
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
          state.data.videos = action.payload.videos;
          state.data.videosStats = action.payload.videosStats;
      })
      .addCase(fetchVideos.rejected, (state) => {
        state.status = 'error';
      })
  },
});

// ACTIONS
interface ISelectVideos {
  videos: IApiResponse | undefined;
  videosStats: IApiSpecificSearchResponse | undefined;
}

export const selectVideos = (state: RootState): ISelectVideos => state.videos.data;

export default videosSlice.reducer;