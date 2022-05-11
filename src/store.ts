import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Action,
  PayloadAction,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { dovetailSlice } from "./dovetailSlice";
import { modSlice } from "./mod-slice";

export const store = configureStore({
  reducer: {
    dovetail: dovetailSlice.reducer,
    mod: modSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
