import { FIREBASE_AUTH } from '@/services/firebase/firebase';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, User } from 'firebase/auth';

type Props = {
  email: string;
  password: string;
};

export type AuthState = {
  loading: boolean;
  errors: Error | null;
  user: User | null;
  accessToken: string | null;
};

const initialState: AuthState = {
  loading: false,
  errors: null,
  user: null,
  accessToken: null,
};

export const loginThnkAction = createAsyncThunk(
  'auth/login',
  async ({ email, password }: Props, { rejectWithValue }) => {
    try {
      const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      return response.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginThnkAction.pending, state => {
      state.loading = true;
    });
    builder.addCase(loginThnkAction.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(loginThnkAction.rejected, state => {
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
