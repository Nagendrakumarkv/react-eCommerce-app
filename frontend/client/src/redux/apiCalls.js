import { publicRequest, userRequest } from "../requestMethods";
import {
  addToCartFailure,
  addToCartStart,
  addToCartSuccess,
  removeProductFailure,
  removeProductStart,
  removeProductSuccess,
} from "./cartRedux";
import {
  ForgotPasswordFailure,
  ForgotPasswordStart,
  ForgotPasswordSuccess,
  loginFailure,
  loginOutFailure,
  loginOutStart,
  loginOutSuccess,
  loginStart,
  loginSuccess,
  RegisterUserFailure,
  RegisterUserStart,
  RegisterUserSuccess,
} from "./userRedux";

import { toast } from "react-toastify";

//LOGIN
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    toast.success("Login Successfully");
  } catch {
    dispatch(loginFailure());
    toast.error("Wrong Credentials");
  }
};

//LOG OUT
export const logOut = async (dispatch) => {
  dispatch(loginOutStart());
  try {
    dispatch(loginOutSuccess());
    toast.success("Sign Out Successfully");
  } catch {
    dispatch(loginOutFailure());
  }
};

//REGISTER
export const register = async (dispatch, user) => {
  dispatch(RegisterUserStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(RegisterUserSuccess(res.data));
    toast.success("Registered Successfully");
  } catch {
    dispatch(RegisterUserFailure());
    toast.error("Registered Unsucessfull");
  }
};

//FORGOT PASSWORD
export const forgotPassword = async (dispatch, userInfo) => {
  dispatch(ForgotPasswordStart());
  try {
    const res = await publicRequest.post("/auth/forgot-password", { userInfo });
    dispatch(ForgotPasswordSuccess(res.data));
    toast.success("password reset successfull");
  } catch {
    dispatch(ForgotPasswordFailure());
    toast.error(
      "wrong username or entered password is already existed with this username"
    );
  }
};

//ADD PRODUCT TO ACRT
export const addToCart = async (dispatch, cartItem) => {
  dispatch(addToCartStart());
  try {
    const res = await userRequest.post("/carts", {
      userId: cartItem.userId,
      products: [{ productId: cartItem._id, quantity: cartItem.quantity }],
    });
    let newCartObject = {
      ...cartItem,
      cartProductId: res.data._id,
    };
    dispatch(addToCartSuccess(newCartObject));
    toast.success("Product Added To Cart Successfully");
  } catch {
    dispatch(addToCartFailure());
  }
};

//REMOVE PRODUCT FROM CART
export const removeCartProduct = async (dispatch, id) => {
  dispatch(removeProductStart());
  try {
    const res = await userRequest.delete(`/carts/${id}`);
    dispatch(removeProductSuccess(id));
    toast.success(res.data);
  } catch {
    dispatch(removeProductFailure());
    toast.error("Something Went Wrong");
  }
};
