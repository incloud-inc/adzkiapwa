import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonProgressBar,
  IonRow,
  IonText,
  useIonViewWillEnter,
  useIonViewWillLeave
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps, useParams } from "react-router";

import QuizFooter from "../../components/Quiz/QuizFooter";
import QuizHeader from "../../components/Quiz/QuizHeader";
import GeneralSkeleton from "../../components/Shared/GeneralSkeleton";
import { connect } from "../../data/connect";
import { getQuizAttempt, setQuizAnswer } from "../../data/quiz/quiz.actions";
import { QuizAnswer, QuizAttempt, QuizAttemptQuestions, QuizList } from "../../models/Quiz";
interface OwnProps extends RouteComponentProps { }

interface StateProps {
  QuizAttempt: QuizAttempt;
  QuizAnswer: QuizAnswer[][];
  QuizRid:string;
  SelectedQuiz:QuizList;
}

interface DispatchProps {
  setQuizAnswer: typeof setQuizAnswer
  getQuizAttempt: typeof getQuizAttempt
}
interface Param {
  quid: string
}
interface AccountProps extends OwnProps, StateProps, DispatchProps { }
const slideQuiz = {
  initialSlide: 0,
  slidesPerView: 10,
  speed: 400,
  spaceBetween: 20,
};
const Quiz: React.FC<AccountProps> = ({ QuizRid,SelectedQuiz, QuizAnswer, QuizAttempt, setQuizAnswer, getQuizAttempt, history }) => {
  let param: Param = useParams();
  
  const [RecentQuestionNumber, setRecentQuestionNumber] = useState<number>(0);
  const [RecentQuestion, setRecentQuestion] = useState<QuizAttemptQuestions>();
  const [AnsweredQuestionTotal, setAnsweredQuestionTotal] = useState<any>(0);
  
  const [QuizInitialized, setQuizInitialized] = useState(false);
  
  const slideQuizRef = useRef<HTMLIonSlidesElement>(null);
  useIonViewWillEnter(()=>{
    console.log(SelectedQuiz,QuizRid);
    if(!SelectedQuiz || !QuizRid){
      history.push('/')
    }
    getQuizAttempt(SelectedQuiz,QuizRid);
  })  
  useIonViewWillLeave(()=>{
    getQuizAttempt(undefined);
  })  
  const QuizInit = () => {
    if (!QuizAnswer?.[parseInt(param.quid)]) {
      
      setRecentQuestion(QuizAttempt?.questions?.[0]);
      let AnswersArray: QuizAnswer[] = new Array();
      QuizAttempt?.questions?.forEach((q: QuizAttemptQuestions, index: number) => {
        AnswersArray.push({
          AnswerIndex: index,
          qid: q.qid || "",
          Answer: "",
          AnswerStatus: index === 0 ? "notvisited" : "notvisited",
        });

      });

      const temp: QuizAnswer[][] = QuizAnswer;
      temp[parseInt(param.quid)] = AnswersArray;

      setQuizAnswer(temp);
      return
    }
    const AI: number = QuizAnswer[parseInt(param.quid)].filter((a: QuizAnswer) => a.Answer === "")[0]
      ? QuizAnswer[parseInt(param.quid)].filter((b: QuizAnswer) => b.Answer === "")[0].AnswerIndex
      : 0;
    const AL = QuizAnswer[parseInt(param.quid)].filter(
      (a: QuizAnswer) => a.AnswerStatus === "answered"
    ).length;
    
    if (AI) {
      setRecentQuestionNumber(AI);
      setRecentQuestion(QuizAttempt?.questions?.[AI]);
      slideQuizRef.current?.slideTo(AI);
    } else {
      const IndexItem = AL === 0 ? AL : AL - 1
      setRecentQuestionNumber(IndexItem);
      setRecentQuestion(QuizAttempt?.questions?.[IndexItem]);
      slideQuizRef.current?.slideTo(IndexItem);
    }
    
    setAnsweredQuestionTotal(AL);
    setQuizAnswer(QuizAnswer);
  }
  
  useEffect(()=>{
    if(QuizAttempt && QuizAnswer && !QuizInitialized){
      setQuizInitialized(true);
      QuizInit();
    }
  },[QuizAttempt,QuizAnswer])
  const NextPage = () => {
    slideQuizRef.current?.slideNext();
    if (RecentQuestionNumber !== QuizAnswer[parseInt(param.quid)].length - 1) {
      setRecentQuestionNumber(RecentQuestionNumber + 1);
      setRecentQuestion(QuizAttempt.questions?.[RecentQuestionNumber + 1]);
    } else {
      setRecentQuestionNumber(QuizAnswer[parseInt(param.quid)].length - 1);
      setRecentQuestion(undefined);
      setTimeout(() => {
        setRecentQuestion(QuizAttempt.questions?.[QuizAnswer[parseInt(param.quid)].length - 1]);
      }, 1000);
    }
  };
  const setAnswer = (AIndex: number, AID: string) => {
    const AnswersArray: QuizAnswer[] = QuizAnswer[parseInt(param.quid)];
    AnswersArray[AIndex].Answer = AID;
    AnswersArray[AIndex].AnswerStatus = "answered";
    SaveLocalAnswer(AnswersArray);
    setAnsweredQuestionTotal(
      AnswersArray.filter((a: any) => a.AnswerStatus === "answered").length
    );
    setTimeout(() => {
      NextPage();
    }, 500);
  };
  const SaveLocalAnswer = (data: QuizAnswer[]) => {
    const GetAD = localStorage.getItem("_cap_AnswerData");
    if (GetAD) {
      let AD: QuizAnswer[][] = JSON.parse(GetAD);
      AD[parseInt(param.quid)] = data;
      setQuizAnswer(AD);
    }
  };
  if (QuizAttempt && QuizAnswer) {
    return (
      <IonPage>
        <QuizHeader></QuizHeader>
        <IonContent className="bg-gray ion-padding">
          <IonProgressBar
            value={QuizAnswer[parseInt(param.quid)] ? (1 / QuizAnswer[parseInt(param.quid)].length) * AnsweredQuestionTotal : 0}
            color="dark"
          ></IonProgressBar>

          <h2>
            <b>Nomor {RecentQuestionNumber + 1}</b>
          </h2>
          <IonText>
            {(RecentQuestion && RecentQuestion.category_name) || ""}
          </IonText>
          <div
            dangerouslySetInnerHTML={{
              __html: (RecentQuestion && RecentQuestion.paragraph) || "",
            }}
          ></div>
          <div
            dangerouslySetInnerHTML={{
              __html: (RecentQuestion && RecentQuestion.question) || "",
            }}
          ></div>
          {QuizAttempt?.options && RecentQuestion
            ? QuizAttempt.options
              .filter((o: any) => o.qid === RecentQuestion.qid)
              .map((oItem: any, oIndex: any) => (
                <IonCard
                  key={oIndex}
                  className={
                    QuizAnswer[parseInt(param.quid)]
                      ? oItem.oid === QuizAnswer[parseInt(param.quid)][RecentQuestionNumber].Answer
                        ? "quizanswer-active"
                        : ""
                      : ""
                  }
                  hidden={oIndex > 4}
                  onClick={() => {
                    setAnswer(RecentQuestionNumber, oItem.oid);
                  }}
                >
                  <IonCardContent>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="2">
                          {oIndex === 0
                            ? "A"
                            : oIndex === 1
                              ? "B"
                              : oIndex === 2
                                ? "C"
                                : oIndex === 3
                                  ? "D"
                                  : "E"}
                        </IonCol>
                        <IonCol size="10">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: oItem.q_option || "",
                            }}
                          ></div>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              ))
            : ""}
        </IonContent>
        <QuizFooter 
        slideQuiz={slideQuiz} 
        slideQuizRef={slideQuizRef} 
        RecentQuestionNumber={RecentQuestionNumber}
        onChangeNumber={(index:number,item:QuizAttemptQuestions)=>{
          setRecentQuestionNumber(index);
          setRecentQuestion(item);
        }}
        ></QuizFooter>
      </IonPage>
    );
  } else if (QuizAttempt === null) {
    return (
      <IonPage>
        <IonContent>
          <GeneralSkeleton></GeneralSkeleton>
        </IonContent>
      </IonPage>
    );
  } else {
    return (
      <IonPage>
        <IonContent>
          <GeneralSkeleton></GeneralSkeleton>
        </IonContent>
      </IonPage>
    );
  }
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    QuizAttempt: state.quiz.QuizAttempt,
    QuizAnswer: state.quiz.QuizAnswer,
    QuizRid: state.quiz.QuizRid,
    SelectedQuiz: state.quiz.SelectedQuiz
  }),
  mapDispatchToProps: {
    setQuizAnswer,
    getQuizAttempt,
  },
  component: Quiz,
});