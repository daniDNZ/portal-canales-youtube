import { configureStore } from "@reduxjs/toolkit";
import channelsReducer from "../slices/channelsSlice";
import videosReducer from "../slices/videosSlice";

export const store = configureStore({
  reducer: {
    channels: channelsReducer,
    videos: videosReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch