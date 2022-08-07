import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess, RegisterUserFailure, RegisterUserStart, RegisterUserSuccess } from "./userRedux"

export const login=async (dispatch,user)=>{
    dispatch(loginStart());
    try{
      const res=await publicRequest.post('/auth/login',user)
      dispatch(loginSuccess(res.data));
    }catch{
        dispatch(loginFailure());
    }
}
export const register=async (dispatch,user)=>{
  dispatch(RegisterUserStart());
  try{
    const res=await publicRequest.post('/auth/register',user)
    dispatch(RegisterUserSuccess(res.data));
  }catch{
      dispatch(RegisterUserFailure());
  }
}
