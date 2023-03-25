import { ApiResponse } from "../../models/Base";
import { GroupDetail, GroupList, LessonList, PaymentDetail, PaymentsHistory, QuizAnswer, QuizAttempt, QuizList, QuizResultDetail, QuizResultList, TrxGopay } from "../../models/Quiz";
import { ActionType } from "../../util/types";
import { ApiCheckPayment, ApiCreateTrxGopay, ApiGroupDetail, ApiGroupList, ApiLessonList, ApiPayments, ApiQuizAttempt, ApiQuizList, ApiQuizResultList, ApiValidateQuiz, getAnswerData, setAnswerDataData } from "../api/quiz";
import { setAlert, setLoading } from "../base/base.actions";
import { QuizState } from "./quiz.state";
export const PostPayments = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading('Memuat Histori Pembayaran'));
  const Response:ApiResponse<PaymentsHistory[]> = await ApiPayments();
  dispatch(setLoading(''));
  if(!Response.data){
    dispatch(setAlert({
      isOpen:true,
      header:'Gagal',
      message:Response.m||"Gagal memuat histori pembayaran",
      subHeader:''
    }))
    return;
  }
  dispatch(setPayments(Response.data));
}
export const PostPurchase = (gid:string,pid:string) => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading('Memuat Detail Pembayaran'));  
  const Response:ApiResponse<PaymentDetail> = await ApiCheckPayment(pid);
  console.log(Response.data?.payment_detail);

  if(Response.data?.payment_detail && Response.data?.payment_detail.transaction_status==="pending"){
    dispatch(setLoading(''))
    dispatch(setPaymentDetail(Response.data));
    dispatch(setTrxGopay(undefined));
    return
  }

  dispatch(setPaymentDetail(undefined));
  const ResponseTrxGopay:ApiResponse<TrxGopay> = await ApiCreateTrxGopay(gid);
  dispatch(setLoading(''));
  if(!ResponseTrxGopay.data){
    dispatch(setAlert({
      isOpen:true,
      header:'Gagal',
      message:Response.m||"Gagal membuat pembayaran",
      subHeader:''
    }))
    return;
  }
  dispatch(setTrxGopay(ResponseTrxGopay.data))
}
export const PostGroupList = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading('Memuat group list'))
  const Response:ApiResponse<GroupList[]> = await ApiGroupList();
  dispatch(setLoading(''));
  if(!Response.data){
    dispatch(setAlert({
      isOpen:true,
      header:'Gagal',
      message:Response.m||"Gagal memuat group list",
      subHeader:''
    }))
    return;
  }
  dispatch(setGroupList(Response.data));
}
export const PostGroupDetail = (id?:string) => async (dispatch: React.Dispatch<any>) => {
  if(id===undefined){dispatch(setGroupDetail(undefined));return;}
  dispatch(setLoading('Memuat group detail'))
  const Response:ApiResponse<GroupDetail> = await ApiGroupDetail(id);
  dispatch(setLoading(''));
  if(!Response.data){
    dispatch(setAlert({
      isOpen:true,
      header:'Gagal',
      message:Response.m||"Gagal memuat group detail",
      subHeader:''
    }))
    return;
  }
  dispatch(setGroupDetail(Response.data));
}
export const PostQuizList = (gids:string) => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading('Memuat quiz list'))
  const Response:ApiResponse<QuizList[]> = await ApiQuizList(gids);
  dispatch(setLoading(''));
  if(!Response.data){
    dispatch(setAlert({
      isOpen:true,
      header:'Gagal',
      message:Response.m||"Gagal memuat group list",
      subHeader:''
    }))
    return;
  }
  dispatch(setQuizList(Response.data));
}
export const PostLessonList = (gids:string) => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading('Memuat group list'))
  const Response:ApiResponse<LessonList[]> = await ApiLessonList(gids);
  dispatch(setLoading(''));
  if(!Response.data){
    dispatch(setAlert({
      isOpen:true,
      header:'Gagal',
      message:Response.m||"Gagal memuat quiz list",
      subHeader:''
    }))
    return;
  }
  dispatch(setLessonList(Response.data));
}

export const PostQuizAttempt = (quid:string) => async (dispatch: React.Dispatch<any>) => {
  dispatch(setQuizAttempt(undefined))
  dispatch(setLoading('Proses validasi quiz'))
  const Response:ApiResponse<string> = await ApiValidateQuiz(quid);
  dispatch(setLoading(''));
  if(!Response.data){
    dispatch(setAlert({
      isOpen:true,
      header:'Gagal',
      message:Response.m||"Tidak bisa melanjutkan quiz",
      subHeader:''
    }))
    return false;
  }
  dispatch(setLoading('Mengambil data quiz'));
  const ResponseAttempt:ApiResponse<QuizAttempt> = await ApiQuizAttempt(Response.data);
  dispatch(setLoading(''));
  if(!ResponseAttempt.data){
    dispatch(setAlert({
      isOpen:true,
      header:'Gagal',
      message:ResponseAttempt.m||"Tidak bisa melanjutkan quiz",
      subHeader:''
    }))
    return false;
  }
  dispatch(setQuizAttempt(ResponseAttempt.data||undefined))
  
  const QuizAnswer:QuizAnswer[][] = await getAnswerData();
  dispatch(setQuizAnswer(QuizAnswer));
}
export const PostQuizResultList = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading('Memuat result list'))
  const Response:ApiResponse<QuizResultList> = await ApiQuizResultList();
  dispatch(setLoading(''));
  if(!Response.data){
    dispatch(setAlert({
      isOpen:true,
      header:'Gagal',
      message:Response.m||"Gagal memuat result list",
      subHeader:''
    }))
    return;
  }
  dispatch(setQuizResultList(Response.data));
}
export const setData = (data: Partial<QuizState>) =>
({
  type: "set-user-data",
  data,
} as const);
export const setPayments = (payments: PaymentsHistory[]) =>
({
  type: "set-payments",
  payments,
} as const);
export const setPaymentDetail = (PaymentDetail?: PaymentDetail) =>
({
  type: "set-payment-detail",
  PaymentDetail,
} as const);
export const setTrxGopay = (TrxGopay?: TrxGopay) =>
({
  type: "set-trx-gopay",
  TrxGopay,
} as const);
export const setGroupList = (GroupList: GroupList[]) =>
({
  type: "set-group-list",
  GroupList,
} as const);
export const setGroupDetail = (GroupDetail?: GroupDetail) =>
({
  type: "set-group-detail",
  GroupDetail,
} as const);
export const setLessonList = (LessonList: LessonList[]) =>
({
  type: "set-lesson-list",
  LessonList,
} as const);
export const setQuizList = (QuizList: QuizList[]) =>
({
  type: "set-quiz-list",
  QuizList,
} as const);
export const setQuizAttempt = (QuizAttempt?: QuizAttempt) =>
({
  type: "set-quiz-attempt",
  QuizAttempt,
} as const);
export const setQuizAnswer = (QuizAnswer: QuizAnswer[][]) =>
{
  setAnswerDataData(QuizAnswer);
  return ({
    type: "set-quiz-answer",
    QuizAnswer,
  } as const);
}
export const setQuizResultList = (QuizResultList?: QuizResultList) =>
({
  type: "set-quiz-result-list",
  QuizResultList,
} as const);
export const setQuizResultDetail = (QuizResultDetail?: QuizResultDetail[]) =>
({
  type: "set-quiz-result-detail",
  QuizResultDetail,
} as const);


export type QuizAction =
| ActionType<typeof setGroupList>
| ActionType<typeof setGroupDetail>
| ActionType<typeof setPayments>
| ActionType<typeof setPaymentDetail>
| ActionType<typeof setTrxGopay>
| ActionType<typeof setLessonList>
| ActionType<typeof setQuizList>
| ActionType<typeof setQuizAttempt>
| ActionType<typeof setQuizAnswer>
| ActionType<typeof setQuizResultList>
| ActionType<typeof setQuizResultDetail>
| ActionType<typeof setData>
