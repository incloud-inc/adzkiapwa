import { BaseAction } from "./base.actions";
import { BaseState } from "./base.state";

export function baseReducer(state: BaseState, action: BaseAction): BaseState {
  switch (action.type) {
    case "set-user-loading":
      return { ...state, loading: action.loading };
    case "set-user-data":
      return { ...state, ...action.data };
    case "set-has-seen-tutorial":
      return { ...state, hasSeenTutorial: action.hasSeenTutorial };
    case "set-dark-mode":
      return { ...state, darkMode: action.darkMode };
    case 'set-alert':
      return { ...state, alert: action.alert };
    case 'set-auth-data': {
      return { ...state, authData: action.authData };

    }
  }
}
