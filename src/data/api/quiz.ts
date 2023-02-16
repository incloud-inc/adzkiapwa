import { Plugins } from "@capacitor/core";
import { BaseUrl } from "../../AppConfig";
import { ApiResponse } from "../../models/Base";
import { GroupDetail, GroupList, LessonList, PaymentDetail, PaymentsHistory, QuizAnswer, QuizAttempt, QuizList, QuizResultList, TrxGopay } from "../../models/Quiz";
import {GetToken} from "./auth"
const { Storage } = Plugins;
const ANSWER_DATA = "AnswerData";
export const ApiPayments = ()=>{
  return GetToken().then(async token=>{
    const BodyData = new FormData();
    BodyData.append("token", token);
    const Response:ApiResponse<PaymentsHistory[]> = await fetch(BaseUrl+"payment/history", {
      method: "POST",
      body: BodyData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Server Ada Masalah");
        }
        return res.json();
      })
      .then((res) => {
        const PaymentsHistory:PaymentsHistory[] = res.histories
        if (PaymentsHistory && PaymentsHistory.length > 0) {
            return{data:PaymentsHistory,m:''}
        } else {
            return{data:[],m:res.message||"Data Detail Tidak Ditemukan"}
        }
      })
      .catch((err) => {
        return{data:[],m:err}
    });  
    return Response
  })
}
export const ApiCheckPayment = (pid:string)=>{
  if(pid=="0") return{data:undefined,m:''}
  return GetToken().then(async token=>{
    const BodyData = new FormData();
    BodyData.append("pid", pid);
    BodyData.append("token", token);
    const Response:ApiResponse<PaymentDetail> = await fetch(BaseUrl+"payment/checkstatuspayment", {
      method: "POST",
      body: BodyData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Server Ada Masalah");
        }
        return res.json();
      })
      .then((res) => {
        const PaymentsHistory:PaymentDetail = res
        if (!PaymentsHistory || !PaymentsHistory.qr_code) throw new Error("Payment Detail Tidak Ditemukan")
        return{data:PaymentsHistory,m:''}
      })
      .catch((err) => {
        return{data:undefined,m:err}
    });  
    return Response
  })
}
export const ApiCreateTrxGopay = (gid:string)=>{
  return GetToken().then(async token=>{
    const BodyData = new FormData();
    BodyData.append("gid", gid);
    BodyData.append("token", token);
    BodyData.append("callbackapp",BaseUrl+"purchase/" + gid +"/0");
    const Response:ApiResponse<TrxGopay> = await fetch(BaseUrl+"payment/createtransactiongopay", {
      method: "POST",
      body: BodyData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Server Ada Masalah");
        }
        return res.json();
      })
      .then((res) => {
        const TrxGopay:TrxGopay = res
        if (!TrxGopay || !TrxGopay?.status ) throw new Error("Payment Detail Tidak Ditemukan")
        return{data:TrxGopay,m:''}
      })
      .catch((err) => {
        return{data:undefined,m:err}
    });  
    return Response
  })
}
export const ApiGroupList = async ()=>{
  return GetToken().then(async token=>{
    const BodyData = new FormData();
    BodyData.append("token", token);
    const Response:ApiResponse<GroupList[]> = await fetch(
      token
      ? BaseUrl + "group/list"
      : BaseUrl + "grouppublic/list", {
      method: "POST",
      body: BodyData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Server Ada Masalah");
        return res.json();
      })
      .then((res) => {
        const GroupList:GroupList[] = res.result;
        if(!GroupList || GroupList.length<1) throw new Error(res.message||"Data List Tidak Ditemukan")
        return{data:GroupList,m:''}
      })
      .catch((err) => {
        return{data:[],m:err||"Server Error"}
    });  
    return Response
  })
}
export const ApiLessonList = async (gids:string)=>{
  return GetToken().then(async token=>{
    const BodyData = new FormData();
    BodyData.append("token", token);
    const Response:ApiResponse<LessonList[]> = await fetch(
      token
      ? BaseUrl + "lesson/list"
      : BaseUrl + "lessonpublic/list", {
      method: "POST",
      body: BodyData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Server Ada Masalah");
        return res.json();
      })
      .then((res) => {
        const LessonList:LessonList[] = res.result?.filter((item:LessonList)=> item.gids===gids);
        if (LessonList.length<1) throw new Error(res.message||"Data List Tidak Ditemukan")
        return{data:LessonList,m:''}
      })
      .catch((err) => {
        return{data:[],m:err||"Server Error"}
    });  
    return Response
  })
}
export const ApiQuizList = async (gids:string)=>{
  return GetToken().then(async token=>{
    const BodyData = new FormData();
    BodyData.append("token", token);
    const Response:ApiResponse<QuizList[]> = await fetch(
      token
      ? BaseUrl + "quiz/list"
      : BaseUrl + "quizpublic/list", {
      method: "POST",
      body: BodyData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Server Ada Masalah");
        return res.json();
      })
      .then((res) => {
        const QuizList:QuizList[] = res.result?.filter((item:QuizList)=> item.gids===gids);
        if (QuizList.length<1) throw new Error(res.message||"Data List Tidak Ditemukan")
        return{data:QuizList,m:''}
      })
      .catch((err) => {
        return{data:[],m:err||"Server Error"}
    });  
    return Response
  })
}
export const ApiGroupDetail = async (id:string)=>{
  return GetToken().then(async token=>{
    const BodyData = new FormData();
    BodyData.append("token", token);
    BodyData.append("gid", id || "");
    const Response:ApiResponse<GroupDetail> = await fetch(
      token
      ? BaseUrl + "group/detail"
      : BaseUrl + "grouppublic/detail", {
      method: "POST",
      body: BodyData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Server Ada Masalah");
        return res.json();
      })
      .then((res) => {
        const GroupDetail:GroupDetail = res.result;
        if(!GroupDetail) throw new Error(res.message||"Data Detail Tidak Ditemukan");
        return{data:GroupDetail,m:''}
      })
      .catch((err) => {
        return{data:undefined,m:err||"Server Error"}
    });  
    return Response
  })
}
export const ApiValidateQuiz = async (quid:string)=>{
  return GetToken().then(async token=>{
    const BodyData = new FormData();
    BodyData.append("token", token);
    BodyData.append("quid", quid || "");
    const Response:ApiResponse<string> = await fetch(
      token
      ? BaseUrl + "quiz/validatequiz"
      : BaseUrl + "quizpublic/validatequiz", {
      method: "POST",
      body: BodyData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Server Ada Masalah");
        return res.json();
      })
      .then((res) => {
        const rid:string = res && res.rid||null;
        if(!rid) throw new Error(res.message||"Data Detail Tidak Ditemukan");
        return{data:rid,m:''}
      })
      .catch((err) => {
        return{data:undefined,m:err||"Server Error"}
    });  
    return Response
  })
}
export const ApiQuizAttempt = async (rid:string)=>{
  return GetToken().then(async token=>{
    const BodyData = new FormData();
    BodyData.append("token", token);
    BodyData.append("rid", rid || "");
    const Response:ApiResponse<QuizAttempt> = await fetch(
      token
      ? BaseUrl + "quiz/attempt"
      : BaseUrl + "quizpublic/attempt", {
      method: "POST",
      body: BodyData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Server Ada Masalah");
        return res.json();
      })
      .then((res) => {
        if (res && res.message)throw new Error(res.message||"Data Detail Tidak Ditemukan");
        const QuizAttempt:QuizAttempt = res||undefined;
        if(!QuizAttempt) throw new Error(res.message||"Data Detail Tidak Ditemukan");
        return{data:QuizAttempt,m:''}
      })
      .catch((err) => {
        return{data:undefined,m:err||"Server Error"}
    });  
    return Response
  })
}

export const getAnswerData = async () => {
  const data:any = await Storage.get({ key: ANSWER_DATA });
  const AnswerDataList:QuizAnswer[][] = JSON.parse(data.value)||[];
  return AnswerDataList||[];
};
export const setAnswerDataData = async (AnswerData?: QuizAnswer[][]) => {
  if (!AnswerData) {
    await Storage.remove({ key: ANSWER_DATA });
  } else {
    await Storage.set({ key: ANSWER_DATA, value: JSON.stringify(AnswerData) });
  }
};
export const ApiQuizResultList = async ()=>{
  return GetToken().then(async token=>{
    const BodyData = new FormData();
    BodyData.append("token", token);
    const Response:ApiResponse<QuizResultList> = await fetch(
      BaseUrl + "quiz/resultlist" ,{
      method: "POST",
      body: BodyData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Server Ada Masalah");
        return res.json();
      })
      .then((res) => {
        const QuizResultList:QuizResultList = res;
        if (!QuizResultList) throw new Error(res.message||"Data List Tidak Ditemukan")
        return{data:QuizResultList,m:''}
      })
      .catch((err) => {
        return{data:undefined,m:err||"Server Error"}
    });  
    return Response
  })
}