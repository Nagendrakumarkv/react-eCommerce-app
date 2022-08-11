import { publicRequest, userRequest } from "../requestMethods";
import {
  addToCartFailure,
  addToCartStart,
  addToCartSuccess,
} from "./cartRedux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  RegisterUserFailure,
  RegisterUserStart,
  RegisterUserSuccess,
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

//REGISTER
export const register = async (dispatch, user) => {
  dispatch(RegisterUserStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(RegisterUserSuccess(res.data));
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
      cartProductId: res.data.products[0]._id,
    };
    dispatch(addToCartSuccess(newCartObject));
  } catch {
    dispatch(addToCartFailure());
  }
};
