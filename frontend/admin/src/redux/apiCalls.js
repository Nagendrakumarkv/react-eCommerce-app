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
  loginStart,
  loginSuccess,
  LogoutFailure,
  LogoutStart,
  LogoutSuccess,
  UpdateUserFailure,
  UpdateUserStart,
  UpdateUserSuccess,
} from "./userRedux";

//LOGIN
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch {
    dispatch(loginFailure());
  }
};

//LOGOUT
export const logOut = async (dispatch) => {
  dispatch(LogoutStart());
  try {
    dispatch(LogoutSuccess());
  } catch {
    dispatch(LogoutFailure());
  }
};

//GET ALL USERS
export const getUsers = async (dispatch) => {
  dispatch(GetUserStart());
  try {
    const res = await userRequest.get("/users");
    console.log("all users", res.data);
    dispatch(GetUserSuccess(res.data));
  } catch {
    dispatch(GetUserFailure());
  }
};
//ADD USER
export const addUser = async (user,dispatch) => {
  dispatch(AddUserStart());
  try {
    const res = await publicRequest.post("/auth/register",user);
    dispatch(AddUserSuccess(res.data));
  } catch {
    dispatch(AddUserFailure());
  }
};

//UPDATE USER
export const updateUser = async (id,user,dispatch) => {
  dispatch(UpdateUserStart());
  try {
    const res = await userRequest.put(`/users/${id}`,user);
    dispatch(UpdateUserSuccess({id:res.data._id,user:res.data}));
  } catch {
    dispatch(UpdateUserFailure());
  }
};
//DELETE USER
export const deleteUser = async (id, dispatch) => {
  dispatch(DeleteUserStart());
  try {
    await userRequest.delete(`/users/${id}`);
    dispatch(DeleteUserSuccess(id));
  } catch {
    dispatch(DeleteUserFailure());
  }
};

//GET ALL PRODUCTS
export const getProducts = async (dispatch) => {
  dispatch(GetProductStart());
  try {
    const res = await publicRequest.get("/products");
    console.log("all products", res.data);
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
  } catch {
    dispatch(DeleteProductFailure());
  }
};
//UPDATE PRODUCT
export const updateProduct = async (id, product, dispatch) => {
  dispatch(UpdateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(UpdateProductSuccess({ id: res.data._id, product: res.data }));
  } catch {
    dispatch(UpdateProductFailure());
  }
};
//ADD PRODUCT
export const addProduct = async (product, dispatch) => {
  dispatch(AddProductStart());
  try {
    const res = await userRequest.post("/products", product);
    dispatch(AddProductSuccess(res.data));
  } catch {
    dispatch(AddProductFailure());
  }
};
