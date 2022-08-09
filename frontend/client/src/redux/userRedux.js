import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    registeredUser: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //LOGIN
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //REGISTERED USER
    RegisterUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    RegisterUserSuccess: (state, action) => {
      state.isFetching = false;
      state.registeredUser = action.payload;
    },
    RegisterUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //LOGIN OUT
    logOut: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  RegisterUserStart,
  RegisterUserSuccess,
  RegisterUserFailure,
  logOut,
} = userSlice.actions;

export default userSlice.reducer;
