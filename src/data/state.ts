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
    SelectedQuiz:{
      "quid": "14",
      "quiz_name": "COBA Attempt",
      "description": "<p>COBA&nbsp;Attempt</p>",
      "start_date": "1669878809",
      "end_date": "1706598809",
      "gids": "1",
      "qids": "586,585,584,583,582",
      "noq": "5",
      "correct_score": "1,1,1,1,1",
      "incorrect_score": "0,0,0,0,0",
      "ip_address": "",
      "duration": "10",
      "maximum_attempts": "3",
      "pass_percentage": "50",
      "view_answer": "1",
      "camera_req": "0",
      "question_selection": "0",
      "gen_certificate": "0",
      "certificate_text": null,
      "with_login": "1",
      "quiz_template": "Default",
      "uids": null,
      "inserted_by": "1",
      "inserted_by_name": "ADMIN ADZKIA",
      "show_chart_rank": "1",
      "quiz_price": "0"
  },
  QuizRid:61
  },
};

export const reducers = combineReducers({
  data: sessionsReducer,
  base: baseReducer,
  quiz: quizReducer
});

export type AppState = ReturnType<typeof reducers>;
