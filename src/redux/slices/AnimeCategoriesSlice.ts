import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export type AnimeCategoryState = {
  genres: any[];
  topMangas: any[];
  mostPopulars: any[];
  categoryToAnimeList: { [key: string]: any[] };
  loading: boolean;
  errors: any;
};

const initialState: any = {
  genres: [],
  topMangas: [],
  mostPopulars: [],
  categoryToAnimeList: {},
  loading: false,
  errors: null,
};

export const getAnimeCategoryThunkAction = createAsyncThunk(
  'anime/Category',
  async (categoryId: string | number, { rejectWithValue }) => {
    try {
      const url = `https://api.jikan.moe/v4/anime?limit=10&genres=${categoryId}`;
      const response = await axios.get(url);
      return {
        id: categoryId,
        value: response.data?.data,
      };
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

const AnimeCategoriesSlice = createSlice({
  name: 'AnimeCategory',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAnimeCategoryThunkAction.pending, state => {
      state.loading = true;
    });
    builder.addCase(getAnimeCategoryThunkAction.fulfilled, (state, action: any) => {
      state.categoryToAnimeList[action.payload?.id] = action.payload?.value;
    });
    builder.addCase(getAnimeCategoryThunkAction.rejected, state => {
      state.loading = false;
    });
  },
});

export default AnimeCategoriesSlice.reducer;
