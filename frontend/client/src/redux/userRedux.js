import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: false,
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
    //FORGOT PASSWORD
    ForgotPasswordStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    ForgotPasswordSuccess: (state, action) => {
      state.isFetching = false;
      state.registeredUser = action.payload;
    },
    ForgotPasswordFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //LOGIN OUT
    loginOutStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginOutSuccess: (state) => {
      state.isFetching = false;
      state.currentUser = false;
    },
    loginOutFailure: (state) => {
      state.isFetching = false;
      state.error = true;
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
  ForgotPasswordStart,
  ForgotPasswordSuccess,
  ForgotPasswordFailure,
  loginOutStart,
  loginOutSuccess,
  loginOutFailure,
} = userSlice.actions;

export default userSlice.reducer;
