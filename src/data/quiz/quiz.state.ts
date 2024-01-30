import { GroupDetail, GroupList, LessonList, PaymentDetail, PaymentsHistory, QuizAnswer, QuizAttempt, QuizList, QuizResultDetail, QuizResultList, TrxGopay } from "../../models/Quiz";

export interface QuizState {
  payments:PaymentsHistory[],
  PaymentDetail?:PaymentDetail,
  TrxGopay?:TrxGopay,
  GroupList:GroupList[],
  GroupDetail?:GroupDetail,
  LessonList:LessonList[],
  QuizList:QuizList[],
  QuizAttempt?:QuizAttempt,
  QuizAnswerList?:QuizAnswer[][],
  QuizAnswer?:QuizAnswer[][],
  SavedQuiz?:QuizAttempt[],
  QuizResultList?:QuizResultList,
  QuizResultDetail?:QuizResultDetail[],
  SelectedQuiz?:QuizList
  QuizRid?:string
}