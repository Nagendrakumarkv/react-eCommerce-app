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
    toast.success("Login Successfully", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  } catch {
    dispatch(loginFailure());
  }
};

//LOG OUT
export const logOut = async (dispatch) => {
  dispatch(loginOutStart());
  try {
    dispatch(loginOutSuccess());
    toast.success("Sign Out Successfully", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
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
    toast.success("Registered Successfully", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  } catch {
    dispatch(RegisterUserFailure());
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
    toast.success("Product Added To Cart Successfully", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
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
    toast.success(res.data, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  } catch {
    dispatch(removeProductFailure());
    toast.error("Something Went Wrong", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  }
};
