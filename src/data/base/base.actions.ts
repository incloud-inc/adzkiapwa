import { Alert, ApiResponse, AuthData, AuthForgotPassword, AuthLogin, AuthSignUp, Loading } from "../../models/Base";
import { ActionType } from "../../util/types";
import { ApiAuthData, ApiForgotPassword, ApiLogin, ApiSignUp, ApiToken, getUserData, setHasSeenTutorialData } from "../api/auth";
import { BaseState } from "./base.state";
export const setLogin = (form:AuthLogin) => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading('Mencoba Login'));
  const Response = await ApiLogin(form);
  dispatch(setLoading(''));
  if(!Response.data){
    dispatch(setAlert({
      isOpen:true,
      header:'Gagal',
      message:Response.m||"Tidak Berhasil Login",
      subHeader:''
    }))
    return;
  }
  ApiAuthData(Response.data);
  const UserData = await getUserData();
  dispatch(setData(UserData));
  setTimeout(() => {
    window.location.href="/";
  }, 500);
}
export const setSignUp = (form:AuthSignUp) => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading('Mencoba Mendaftar'));
  const Response = await ApiSignUp(form);
  dispatch(setLoading(''));
  if(!Response.data){
    dispatch(setAlert({
      isOpen:true,
      header:'Gagal',
      message:Response.m||"Tidak Berhasil Register",
      subHeader:''
    }))
    return;
  }
  dispatch(setAlert({
    isOpen:true,
    header:'Berhasil',
    message:"Register Berhasil",
    subHeader:''
  }))
  ApiAuthData(Response.data);
  const UserData = await getUserData();
  dispatch(setData(UserData));
  setTimeout(() => {
    window.location.href="/";
  }, 500);
}
export const setForgotPassword = (form:AuthForgotPassword) => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading('Mencoba Reset Password'));
  const Response:ApiResponse<string> = await ApiForgotPassword(form);
  dispatch(setLoading(''));
  if(!Response.data){
    dispatch(setAlert({
      isOpen:true,
      header:'Gagal',
      message:Response.m||"Tidak Berhasil Reset Password",
      subHeader:''
    }))
    return;
  }
  dispatch(setAlert({
    isOpen:true,
    header:'Berhasil',
    message:""+Response.data,
    subHeader:''
  }))
}
export const loadUserData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading('Memuat data'));
  const Response:ApiResponse<boolean> = await ApiToken();
  if(!Response.data){
    dispatch(setAlert({
      isOpen:true,
      header:'Gagal',
      message:Response.m||"Tidak Berhasil Login",
      subHeader:''
    }))
    dispatch(setLoading(''));
    return;
  }
  const UserData = await getUserData();
  dispatch(setData(UserData));
  dispatch(setLoading(''));
};
export const setLoading = (m?: string) =>{
  const loading:Loading = {isOpen:m?true:false,message:m};
  return ({
    type: "set-user-loading",
    loading,
  } as const);
}
  
export const setAlert = (alert: Alert) =>
{
  if(alert.message){
    alert.message = alert.message.toString().replace('Error: ','');
  }
  return{
    type: "set-alert",
    alert,
  } as const;
}

export const setData = (data: Partial<BaseState>) =>
  ({
    type: "set-user-data",
    data,
  } as const);

export const logoutUser = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setAuthData(undefined));
};
export const setAuthData = (authData?: AuthData) => async (dispatch: React.Dispatch<any>) => { 
    await ApiAuthData(authData);
    const data = await getUserData();
    console.log(data);
    
    dispatch(setData(data));
    return {
      type: "set-auth-data",
      authData,
    } as const;
  };

export const setHasSeenTutorial =
  (hasSeenTutorial: boolean) => async (dispatch: React.Dispatch<any>) => {
    await setHasSeenTutorialData(hasSeenTutorial);
    return {
      type: "set-has-seen-tutorial",
      hasSeenTutorial,
    } as const;
  };

export const setDarkMode = (darkMode: boolean) =>
  ({
    type: "set-dark-mode",
    darkMode,
  } as const);

export type BaseAction =
| ActionType<typeof setLoading>
| ActionType<typeof setData>
  | ActionType<typeof setAlert>
  | ActionType<typeof setAuthData>
  | ActionType<typeof setHasSeenTutorial>
  | ActionType<typeof setDarkMode>;
