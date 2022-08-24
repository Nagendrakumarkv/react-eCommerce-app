import { publicRequest, userRequest } from "../requestMethods";
import {
  AddProductFailure,
  AddProductStart,
  AddProductSuccess,
  DeleteProductFailure,
  DeleteProductStart,
  DeleteProductSuccess,
  GetProductFailure,
  GetProductStart,
  GetProductSuccess,
  UpdateProductFailure,
  UpdateProductStart,
  UpdateProductSuccess,
} from "./productRedux";
import {
  AddUserFailure,
  AddUserStart,
  AddUserSuccess,
  DeleteUserFailure,
  DeleteUserStart,
  DeleteUserSuccess,
  GetUserFailure,
  GetUserStart,
  GetUserSuccess,
  loginFailure,
  loginOutFailure,
  loginOutStart,
  loginOutSuccess,
  loginStart,
  loginSuccess,
  UpdateUserFailure,
  UpdateUserStart,
  UpdateUserSuccess,
} from "./userRedux";

import { toast } from "react-toastify";

//LOGIN
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    toast.success("Login Successfull");
  } catch {
    dispatch(loginFailure());
    toast.error("Login Unsuccessful,Please Check the Credentials");
  }
};

//LOG OUT
export const logOut = async (dispatch) => {
  dispatch(loginOutStart());
  try {
    dispatch(loginOutSuccess());
    toast.success("Sign Out Successfull");
  } catch {
    dispatch(loginOutFailure());
  }
};

//GET ALL USERS
export const getUsers = async (dispatch) => {
  dispatch(GetUserStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(GetUserSuccess(res.data));
  } catch {
    dispatch(GetUserFailure());
  }
};
//ADD USER
export const addUser = async (user, dispatch) => {
  dispatch(AddUserStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(AddUserSuccess(res.data));
    toast.success("User Added Successfull");
  } catch {
    dispatch(AddUserFailure());
    toast.error("User Added Unsuccessfull");
  }
};

//UPDATE USER
export const updateUser = async (id, user, dispatch) => {
  dispatch(UpdateUserStart());
  try {
    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(UpdateUserSuccess({ id: res.data._id, user: res.data }));
    toast.success("User Updated Successfull");
  } catch {
    dispatch(UpdateUserFailure());
    toast.error("User Updated Unsuccessfull");
  }
};
//DELETE USER
export const deleteUser = async (id, dispatch) => {
  dispatch(DeleteUserStart());
  try {
    await userRequest.delete(`/users/${id}`);
    dispatch(DeleteUserSuccess(id));
    toast.success("User Deleted Successfull");
  } catch {
    dispatch(DeleteUserFailure());
    toast.error("User Deleted Unsuccessfull");
  }
};

//GET ALL PRODUCTS
export const getProducts = async (dispatch) => {
  dispatch(GetProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(GetProductSuccess(res.data));
  } catch {
    dispatch(GetProductFailure());
  }
};
//DELETE PRODUCT
export const deleteProduct = async (id, dispatch) => {
  dispatch(DeleteProductStart());
  try {
    await userRequest.delete(`/products/${id}`);
    dispatch(DeleteProductSuccess(id));
    toast.success("Product Deleted Successfull");
  } catch {
    dispatch(DeleteProductFailure());
    toast.error("Product Deleted Unsuccessfull");
  }
};
//UPDATE PRODUCT
export const updateProduct = async (id, product, dispatch) => {
  dispatch(UpdateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(UpdateProductSuccess({ id: res.data._id, product: res.data }));
    toast.success("Product Updated Successfull");
  } catch {
    dispatch(UpdateProductFailure());
    toast.error("Product Updated Unsuccessfull");
  }
};
//ADD PRODUCT
export const addProduct = async (product, dispatch) => {
  dispatch(AddProductStart());
  try {
    const res = await userRequest.post("/products", product);
    dispatch(AddProductSuccess(res.data));
    toast.success("Product Added Successfull");
  } catch {
    dispatch(AddProductFailure());
    toast.error("Product Added Unsuccessfull");
  }
};
