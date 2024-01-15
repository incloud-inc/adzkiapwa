import { ApiResponse } from "../../models/Base";
import { GroupDetail, GroupList, LessonList, PaymentDetail, PaymentsHistory, QuizAnswer, QuizAttempt, QuizList, QuizResultDetail, QuizResultList, TrxGopay } from "../../models/Quiz";
import { formatPHPTimeStamp } from "../../util/helper";
import { ActionType } from "../../util/types";
import { ApiCheckPayment, ApiCreateTrxGopay, ApiGroupDetail, ApiGroupList, ApiLessonList, ApiPayments, ApiQuizAttempt, ApiQuizList, ApiQuizResultList, ApiValidateQuiz, getAnswerData, getSavedQuizData, setAnswerDataData, setSavedQuizDataData } from "../api/quiz";
import { setAlert, setLoading } from "../base/base.actions";
import { QuizState } from "./quiz.state";
export const PostPayments = () => async (dispatch: React.Dispatch<any>) => {
  dispatch(setLoading('Memuat Histori Pembayaran'));
  const Response:ApiResponse<PaymentsHistory[]> = await ApiPayments();
  dispatch(setLoading(''));
  if(!Response.data){
    dispatch(setAlert({
      cssClass:'tesaja',
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
export const PostQuizValidate = (SelectedQuiz:QuizList) => async (dispatch: React.Dispatch<any>) =>{
    if (!SelectedQuiz) {
    return;
  }
  dispatch(setLoading('Proses validasi quiz'))
  const Response:ApiResponse<string> = await ApiValidateQuiz(SelectedQuiz.quid);
  dispatch(setLoading(''));  
  if(!Response.data){
    dispatch(setQuizRid(''))
    if(Response.m=='expired'){
      dispatch(setAlert({
        isOpen: true,
        cssClass:'alertexpired',
        header:'EXPIRED',
        message:"TryOut ini telah berakhir pada "+formatPHPTimeStamp(SelectedQuiz.end_date)+". Coba kerjakan TryOut lain yang tersedia Trimakasih...",
        subHeader:''
      }));
      return false
    }
    if(Response.m==='coming soon'){
      dispatch(setAlert({
        isOpen: true,
        header:'COMING SOON',
        cssClass:'alertcomingsoon',
        message:"STAY TUNED. TryOut ini bisa kamu kerjakan besok pada " + formatPHPTimeStamp(SelectedQuiz.start_date),
        subHeader:''
      }));
      return false
    }
    dispatch(setAlert({
      isOpen: true,
      header:'Expired',
      message:Response.m||"Tidak bisa melanjutkan quiz",
      subHeader:''
    }));
    return false;
  }
  dispatch(setQuizRid(Response.data))
}
export const getQuizAttempt = (quiz?:QuizList,rid?:string) => async (dispatch: React.Dispatch<any>) => {
  dispatch(setQuizAttempt(undefined));
  
  if (!rid || !quiz || !quiz.quid) {
    return;
  }
  dispatch(setLoading('Mengambil data quiz'));
  let sqd:QuizAttempt[]= await getSavedQuizData();
  let getQuizById:QuizAttempt = sqd[parseInt(quiz.quid)];
  if(getQuizById){
    dispatch(setLoading(''));

    dispatch(setQuizAttempt(getQuizById));

    const QuizAnswer:QuizAnswer[][] = await getAnswerData();
    
    dispatch(setQuizAnswer(QuizAnswer));  
    return;
  }
  const ResponseAttempt:ApiResponse<QuizAttempt> = await ApiQuizAttempt(quiz,rid);
  const quid:string =ResponseAttempt.data?.quiz?.quid || '';
  const QuizDetail:QuizAttempt = ResponseAttempt.data||{};
  sqd[parseInt(quid)]=QuizDetail;
  dispatch(setSavedQuiz(sqd));
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
export const setSavedQuiz = (QuizAnswer: QuizAttempt[]) =>
{
  setSavedQuizDataData(QuizAnswer);
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
export const setSelectedQuiz = (SelectedQuiz?: QuizList) =>
({
  type: "set-selected-quiz",
  SelectedQuiz,
} as const);
export const setQuizRid = (QuizRid?: string) =>
({
  type: "set-quiz-rid",
  QuizRid,
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
| ActionType<typeof setSelectedQuiz>
| ActionType<typeof setQuizRid>
| ActionType<typeof setData>
