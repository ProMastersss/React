import { ActionReducerMapBuilder, createAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { AppState } from "..";

const APP_HYDRATE = createAction<AppState>(HYDRATE);

export const extraReducers: any = (
  builder: ActionReducerMapBuilder<any>,
  reducerName: keyof AppState
) => {
  builder.addCase(APP_HYDRATE, (state, action) => {
    console.log("HYDRATE " + reducerName, action.payload[reducerName]);
    return {
      ...state,
      ...action.payload[reducerName],
    };
  });
};
