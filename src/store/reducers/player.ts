import PlayerState from "@/types/player";
import { ITrack } from "@/types/tracks";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: PlayerState = {
  currentTime: 0,
  duration: 0,
  isPause: true,
  volume: 70,
  activeTrack: null,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    play: (state) => {
      state.isPause = false;
    },
    pause: (state) => {
      state.isPause = true;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setActiveTrack: (state, action: PayloadAction<ITrack | null>) => {
      state.activeTrack = action.payload;
      state.duration = 0;
      state.currentTime = 0;
      state.isPause = true;
    },
  },
  extraReducers: (builder) => {
    //extraReducers(builder, "player");
  },
});

export const {
  play,
  pause,
  setCurrentTime,
  setVolume,
  setDuration,
  setActiveTrack,
} = playerSlice.actions;

export default playerSlice.reducer;
