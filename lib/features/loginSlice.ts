import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: any | null;
  token: string | null | any;
  profile: any | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
  profile: null,
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: any; token: any, profile: any }>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.profile = action.payload.profile;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = loginSlice.actions;
export default loginSlice.reducer;
