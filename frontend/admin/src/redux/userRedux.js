import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    users: [],
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
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //GET ALL USERS
    GetUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    GetUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    GetUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD USER
    AddUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    AddUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.push(action.payload);
    },
    AddUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE USER
    UpdateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    UpdateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users[
        state.users.findIndex((user) => user._id === action.payload.id)
      ] = action.payload.user;
    },
    UpdateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //DELETE USER
    DeleteUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    DeleteUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.splice(
        state.users.findIndex((user) => user._id === action.payload),
        1
      );
    },
    DeleteUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //LOGOUT
    LogoutStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    LogoutSuccess: (state) => {
      state.isFetching = false;
      state.currentUser = null;
    },
    LogoutFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  GetUserStart,
  GetUserSuccess,
  GetUserFailure,
  AddUserStart,
  AddUserSuccess,
  AddUserFailure,
  UpdateUserStart,
  UpdateUserSuccess,
  UpdateUserFailure,
  DeleteUserStart,
  DeleteUserSuccess,
  DeleteUserFailure,
  LogoutStart,
  LogoutSuccess,
  LogoutFailure,
} = userSlice.actions;

export default userSlice.reducer;
