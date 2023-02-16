import { Alert, AuthData, Loading } from "../../models/Base";

export interface BaseState {
  isLoggedin:boolean,
  darkMode: boolean;
  hasSeenTutorial: boolean;
  loading: Loading;
  authData?: AuthData;
  // authToken?: string;
  alert: Alert;
}