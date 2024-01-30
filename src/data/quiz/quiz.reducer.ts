import { QuizAction } from "./quiz.actions";
import { QuizState } from "./quiz.state";

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "set-user-data":
      return { ...state, ...action.data };
    case "set-payments": {
      return { ...state, payments: action.payments };
    }
    case "set-payment-detail": {
      return { ...state, PaymentDetail: action.PaymentDetail };
    }
    case "set-trx-gopay": {
      return { ...state, TrxGopay: action.TrxGopay };
    }
    case "set-group-list": {
      return { ...state, GroupList: action.GroupList };
    }
    case "set-group-detail": {
      return { ...state, GroupDetail: action.GroupDetail };
    }
    case "set-lesson-list": {
      return { ...state, LessonList: action.LessonList };
    }
    case "set-quiz-list": {
      return { ...state, QuizList: action.QuizList };
    }
    case "set-quiz-attempt": {
      return { ...state, QuizAttempt: action.QuizAttempt };
    }
    case "set-quiz-answer": {
      return { ...state, QuizAnswer: action.QuizAnswer };
    }
    case "set-saved-quiz": {
      return { ...state, SavedQuiz: action.SavedQuiz };
    }
    case "set-quiz-result-list": {
      return { ...state, QuizResultList: action.QuizResultList };
    }
    case "set-quiz-result-detail": {
      return { ...state, QuizResultDetail: action.QuizResultDetail };
    }
    case "set-selected-quiz": {
      return { ...state, SelectedQuiz: action.SelectedQuiz };
    }
    case "set-quiz-rid": {
      return { ...state, QuizRid: action.QuizRid };
    }
    
  }
}
