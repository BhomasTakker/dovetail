import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";

interface Livery {
  id: number;
  name: string;
  image: string;
}

export type DovetailState = {
  data: AnyAsyncThunk[];
  search: string;
  pending: boolean;
  error: boolean;
  //
  sort: string;
  pageSize: number;
  page: number;
};

const initialState: DovetailState = {
  data: [],
  search: "",
  pending: false,
  error: false,
  //
  sort: "mostPopular",
  pageSize: 12,
  page: 1,
};

export const getData = createAsyncThunk("data/getData", async () => {
  const response = await fetch(
    `https://ugc-api.dovetailgames.com/mods?page=1&pageSize=12&sortBy=mostPopular`
  );

  return await response.json();
});

export const dovetailSlice = createSlice({
  name: "dovetail",
  initialState,
  reducers: {
    rehydrate(state, action: PayloadAction<DovetailState>) {
      state.error = action.payload.error;
      state.pending = action.payload.pending;
      state.data = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.pending = true;
      })
      .addCase(getData.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;
      })
      .addCase(getData.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export const { rehydrate } = dovetailSlice.actions;

export const searchData = (state) => state.dovetail.data;
export const sortBy = (state) => state.dovetail.sortBy;
export const pageSize = (state) => state.dovetail.pageSize;
export const page = (state) => state.dovetail.page;
