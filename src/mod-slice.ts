import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";

interface Livery {
  id: number;
  name: string;
  image: string;
}

export type ModState = {
  data: AnyAsyncThunk[];
  pending: boolean;
  error: boolean;
};

const initialState: ModState = {
  data: [],
  pending: false,
  error: false,
};

export const getData = createAsyncThunk("mod/getData", async (id: string) => {
  console.log(id);
  const response = await fetch(`https://ugc-api.dovetailgames.com/mods/${id}`);

  return await response.json();
});

export const modSlice = createSlice({
  name: "mod",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<any>) {
      state.data = action.payload;
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

export const { setData } = modSlice.actions;

export const modData = (state) => state.mod.data;
