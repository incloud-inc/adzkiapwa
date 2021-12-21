import { UserActions } from "./user.actions";
import { UserState } from "./user.state";

export function userReducer(state: UserState, action: UserActions): UserState {
  switch (action.type) {
    case "set-user-loading":
      return { ...state, loading: action.isLoading };
    case "set-user-data":
      return { ...state, ...action.data };
    case "set-auth-token":
      return { ...state, authToken: action.authToken };
    case "set-auth-data":
      return { ...state, authData: action.authData };
    case "set-has-seen-tutorial":
      return { ...state, hasSeenTutorial: action.hasSeenTutorial };
    case "set-dark-mode":
      return { ...state, darkMode: action.darkMode };
    case "set-alert":
      return { ...state, alert: action.alert };
  }
}
