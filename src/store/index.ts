import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { Context, createWrapper } from "next-redux-wrapper";
import playerReducer, { playerSlice } from "./reducers/player";
import tracksReducer, { tracksSlice } from "./reducers/tracks";

const store = configureStore({
  reducer: {
    [playerSlice.name]: playerReducer,
    [tracksSlice.name]: tracksReducer,
  },
});

const makeStore = (context: Context) => store;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
