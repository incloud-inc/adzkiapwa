import { combineReducers } from "./combineReducers";
import { sessionsReducer } from "./sessions/sessions.reducer";
import { baseReducer } from "./base/base.reducer";
import { quizReducer } from "./quiz/quiz.reducer";

export const initialState: AppState = {
  data: {
    schedule: { groups: [] } as any,
    sessions: [],
    speakers: [],
    favorites: [],
    locations: [],
    allTracks: [],
    filteredTracks: [],
    mapCenterId: 0,
    loading: false,
    menuEnabled: true,
  },
  base: {
    hasSeenTutorial: false,
    darkMode: false,
    isLoggedin: true,
    loading: false,
    authData:undefined,
    alert: {
      isOpen: false,
      header: "",
      subHeader: "",
      message: "",
    },
  },
  quiz: {
    payments:undefined,
    QuizResultList:undefined,
    SelectedQuiz:undefined
  },
};

export const reducers = combineReducers({
  data: sessionsReducer,
  base: baseReducer,
  quiz: quizReducer
});

export type AppState = ReturnType<typeof reducers>;
