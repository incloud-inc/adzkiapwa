import {
  getUserData,
  setHasSeenTutorialData,
  getAuthToken,
  setAuthDataData,
} from "../dataApi";
import { ActionType } from "../../util/types";
import { UserState } from "./user.state";
import { BaseUrl } from "../../AppConfig";

export const loadUserData = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading(true));
  const data = await getUserData();
  dispatch(setData(data));
  fetch(BaseUrl +"auth/token")
    .then((response) => response.json())
    .then((response) => {
      if (response.token) {
        dispatch(setLoading(false));
        dispatch(setAuthToken(response.token));
      }
    })
    .catch((error) => {
      dispatch(setLoading(false));
      dispatch(
        setAlert({
          isOpen: true,
          header: "Gagal",
          subHeader: "",
          message: "Ada Masalah dengan Koneksi Internet Anda",
        })
      );
    });
};
export const setLoading = (isLoading: boolean) =>
  ({
    type: "set-user-loading",
    isLoading,
  } as const);
export const setAlert = (alert: any) =>
  ({
    type: "set-alert",
    alert,
  } as const);
export const setAuthToken = (authToken: string) =>
  ({
    type: "set-auth-token",
    authToken,
  } as const);

export const setData = (data: Partial<UserState>) =>
  ({
    type: "set-user-data",
    data,
  } as const);

export const logoutUser = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setAuthData(undefined));
};
export const setAuthData =
  (authData?: any) => async (dispatch: React.Dispatch<any>) => {
    setAuthDataData(authData);
    const data = await getUserData();

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

export type UserActions =
  | ActionType<typeof setLoading>
  | ActionType<typeof setData>
  | ActionType<typeof setAuthToken>
  | ActionType<typeof setAlert>
  | ActionType<typeof setAuthData>
  | ActionType<typeof setHasSeenTutorial>
  | ActionType<typeof setDarkMode>;
