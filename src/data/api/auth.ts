import { Plugins } from "@capacitor/core";
import { BaseUrl } from "../../AppConfig";
import { ApiResponse, AuthData, AuthForgotPassword, AuthLogin, AuthSignUp } from "../../models/Base";

const { Storage } = Plugins;
const HAS_SEEN_TUTORIAL = "hasSeenTutorial";
const AUTH_DATA = "authData";
export const GetToken = async ():Promise<string> => {
  const TempAuthData:any = await Storage.get({ key: AUTH_DATA });
  const AuthData = JSON.parse(TempAuthData.value);
  return AuthData?.token||'';
} 
export const ApiLogin = async (form:AuthLogin)=>{
  const BodyData = new FormData();
  BodyData.append("email", form.email);
  BodyData.append("password", form.password);
  const Response:ApiResponse<AuthData> = await fetch(BaseUrl+"auth/login", {
      method: "POST",
      body: BodyData,
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Server Bermasalah");
      }
      return res.json();
    })
    .then((res) => {
      if(!res.token || !res.data){throw new Error("Login Tidak Berhasil")}
      res.data.token = res.token;
      const AuthData:AuthData = res.data;
      if(!AuthData){throw new Error(res.message||'Login tidak berhasil')}
      return{data:AuthData,m:''}
    })
    .catch((err) => {
      return{data:undefined,m:err||'Server Bermasalah'}
    });
  return Response
}
export const ApiSignUp = async (form:AuthSignUp)=>{
  const BodyData = new FormData();
  BodyData.append("email", form.email);
  BodyData.append("password", form.password);
  BodyData.append("first_name", form.first_name);
  BodyData.append("last_name", form.last_name);
  BodyData.append("phone", form.phone);
  const Response:ApiResponse<AuthData> = await fetch(BaseUrl+"auth/register", {
      method: "POST",
      body: BodyData,
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Server Bermasalah");
      }
      return res.json();
    })
    .then((res) => {
      if(!res.token || !res.data){throw new Error("Daftar Tidak Berhasil")}
      res.data.token = res.token;
      const AuthData:AuthData = res.data;
      if(!AuthData){throw new Error(res.message||'Daftar tidak berhasil')}
      return{data:AuthData,m:''}
    })
    .catch((err) => {
      return{data:undefined,m:err||"Server Bermasalah"}
    });
  return Response
}
export const ApiForgotPassword = async (form:AuthForgotPassword)=>{
  const BodyData = new FormData();
  BodyData.append("phone", form.phone);
  const Response:ApiResponse<string> = await fetch(BaseUrl+"auth/forgotpassword", {
      method: "POST",
      body: BodyData,
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Server Bermasalah");
      }
      return res.json();
    })
    .then((res) => {
      const NewPassword:string = res.message||undefined;      
      if(!NewPassword) throw new Error("Server Bermasalah")
      return{data:NewPassword,m:''}
    })
    .catch((err) => {
      return{data:undefined,m:err||"Server Bermasalah"}
    });
  return Response
}
export const ApiToken = async ()=>{
  const Response:ApiResponse<boolean> = await fetch(BaseUrl +"auth/token")
  .then((res) => {
    if (!res.ok) {
      throw new Error("Server Bermasalah");
    }
    return res.json();
  })
  .then((res) => {
    const token:string = res.token||undefined;
    if (!token) throw new Error("Koneksi Bermasalah")
    return{data:true,m:''}
  })
  .catch((error) => {
    return{data:undefined,m:error||"Server Bermasalah"}
  });
  return Response
}
export const getUserData = async () => {
  const response = await Promise.all([
    Storage.get({ key: HAS_SEEN_TUTORIAL }),
    Storage.get({ key: AUTH_DATA }),
  ]);
  const hasSeenTutorial = (await response[0].value) === "true";
  const authDataTemp = (await response[1].value) || "";
  const authData = authDataTemp ? JSON.parse(authDataTemp) : null;
  const data = {
    hasSeenTutorial,
    authData,
  };
  return data;
};

export const setHasSeenTutorialData = async (hasSeenTutorial: boolean) => {
  await Storage.set({
    key: HAS_SEEN_TUTORIAL,
    value: JSON.stringify(hasSeenTutorial),
  });
};
export const ApiAuthData = async (authData?: AuthData) => {
  if (!authData) {
    await Storage.remove({ key: AUTH_DATA });
  } else {
    await Storage.set({ key: AUTH_DATA, value: JSON.stringify(authData) });
  }
};