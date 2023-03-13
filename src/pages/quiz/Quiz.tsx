import { Plugins } from "@capacitor/core";
import {
  IonBackButton, IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLoading, IonPage,
  IonProgressBar,
  IonRow,
  IonSlide,
  IonSlides,
  IonText,
  IonTitle,
  IonToolbar, useIonViewDidEnter, useIonViewWillLeave
} from "@ionic/react";
import { Statistic } from "antd";
import { stopwatchOutline } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps, useParams } from "react-router";

import GeneralSkeleton from "../../components/Shared/GeneralSkeleton";
import { connect } from "../../data/connect";
import { BaseUrl } from "../../AppConfig";
import { PostQuizAttempt, setQuizAnswer } from "../../data/quiz/quiz.actions";
import { AuthData } from "../../models/Base";
import { QuizAnswer, QuizAttempt, QuizAttemptQuestions } from "../../models/Quiz";
const { Countdown } = Statistic;
interface OwnProps extends RouteComponentProps { }

interface StateProps {
  authData: AuthData;
  QuizAttempt: QuizAttempt,
  QuizAnswer: QuizAnswer[][]
}

interface DispatchProps {
  setQuizAnswer: typeof setQuizAnswer
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
var countdownTimer: any;
let TimeSaver = 0;
interface QuizTime {
  Countdown: number,
  QuizId?: string
}
const Quiz: React.FC<AccountProps> = ({ authData, history, QuizAnswer, QuizAttempt, setQuizAnswer }) => {
  let param: Param = useParams();

  const QT = localStorage.getItem("QuizTime");

  const parsedQT: any = QT ? JSON.parse(QT) : [];
  const getQT: any = parsedQT ? parsedQT.find((x: any) => x.QuizId == param.quid) : undefined;
  const [rid, setrid] = useState<number>(0);
  const [RecentQuestionNumber, setRecentQuestionNumber] = useState<number>(0);
  const [RecentQuestion, setRecentQuestion] = useState<QuizAttemptQuestions>();
  const [QuizData, setQuizData] = useState<any>(undefined);
  const [AnsweredQuestionTotal, setAnsweredQuestionTotal] = useState<any>(0);
  const [QuizDuration, setQuizDuration] = useState(0);
  const [QuizDurationCountdown, setQuizDurationCountdown] = useState<any>(
    new Date()
  );
  const [QuizSubmitable, setQuizSubmitable] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [ShowModal, setShowModal] = useState(true);

  useEffect(() => {
    if (!countdownTimer) {
    }
  }, [QuizDuration]);
  const slideQuizRef = useRef<HTMLIonSlidesElement>(null);
  const onFinish = () => {
    submitQuiz();
  };


  // const setQuizTimer = (expiryTimestamp: Date) => {
  //   const { seconds, minutes, hours } = useTimer({
  //     expiryTimestamp,
  //     onExpire: () => setQuizDuration("Expired"),
  //   });
  //   return setQuizDuration(hours + ":" + minutes + ":" + seconds);
  // };
  // const QuizTimer = (expiryTimestamp: any) => {
  //   console.log(expiryTimestamp);

  //   const { seconds, minutes, hours } = useTimer({
  //     expiryTimestamp,
  //     onExpire: () => setQuizDuration("Expired"),
  //   });
  //   console.log(hours + ":" + minutes + ":" + seconds);

  //   return (
  //     <IonText>
  //       <b>{hours + ":" + minutes + ":" + seconds}</b>
  //     </IonText>
  //   );
  // };
  // const getQuiz = () => {
  //   fetch("/assets/data/question.json", {
  //     // method: "POST",
  //     // body: BodyData,
  //   })
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error("Server Bermasalah");
  //       }
  //       return res.json();
  //     })
  //     .then((res) => {
  //       setQuizData(res);
  //       setRecentQuestion(res.questions[0]);
  //       let AnswersArray = new Array();
  //       res.questions.forEach((q: any, index: any) => {
  //         AnswersArray.push({
  //           AnswerIndex: index,
  //           qid: q.qid,
  //           Answer: "",
  //           AnswerStatus: index === 0 ? "notvisited" : "notvisited",
  //         });
  //       });
  //       setAnswers(AnswersArray);
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // };
  const calculateTimeLeftStart = () => {
    var d1 = new Date();
    let difference = +new Date("31 Desemnber 2021") - +new Date();

    let timeLeft = {};
    if (difference > 0) {
      if (Math.floor(difference / 1000 / 60) % 60 === 0) {
        timeLeft = {
          minutes: 0,
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        timeLeft = {
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
    }

    return timeLeft;
  };
  const calculateTimeLeft = () => {
    var d1 = new Date();
    var d2 = new Date(d1);

    d2.setMinutes(d1.getMinutes() + parseInt(QuizAttempt?.quiz?.duration || "0"));

    let difference = +d2 - +new Date();

    let timeLeft = {};
    if (difference > 0) {
      if (Math.floor(difference / 1000 / 60) % 60 === 0) {
        timeLeft = {
          minutes: 0,
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        timeLeft = {
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
    }

    return timeLeft;
  };
  // useIonViewDidEnter(() => {
  //   getQuiz();
  // });
  const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeftStart());
  useEffect(() => {
    if (!QuizAttempt?.quiz?.duration) { return; }
    let timer: any = null;
    if (timeLeft.minutes !== undefined) {
      timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [QuizAttempt]);
  const [showAlert, setShowAlert] = useState(false);
  const [ava, setAva] = useState(
    (authData && authData.photo) ||
    "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
  );
  const RunDuration = () => {
    setQuizDuration(parseInt(QuizAttempt.quiz?.duration || "0") * 60);
    TimeSaver = getQT ? getQT.Countdown : parseInt(QuizAttempt.quiz?.duration || "0") * 60
    if (TimeSaver > 0) {
      countdownTimer = setInterval(() => {
        TimeSaver = TimeSaver - 1;
        const NewQuizTime: QuizTime = { QuizId: param.quid, Countdown: TimeSaver }
        const QuizTempStorage: string = localStorage.getItem('QuizTime') || '';
        if (!QuizTempStorage) {
          localStorage.setItem("QuizTime", JSON.stringify([NewQuizTime]));
        } else {
          const TempQuizTime: QuizTime[] = JSON.parse(QuizTempStorage);
          if (!TempQuizTime.find(x => x.QuizId == param.quid)) {
            localStorage.setItem("QuizTime", JSON.stringify([...TempQuizTime, NewQuizTime]));
          } else {
            TempQuizTime.forEach((qt: QuizTime) => {
              if (qt.QuizId == param.quid && history.location.pathname.includes("/quiz/start")) {
                qt.Countdown = qt.Countdown - 1
              }
            })
            localStorage.setItem("QuizTime", JSON.stringify(TempQuizTime));
          }
        }

        if (TimeSaver === 0) {
          clearInterval(countdownTimer);
        }
      }, 1000);
    }
    let cd: Date = new Date();
    if (getQT) {
      cd.setSeconds(cd.getSeconds() + getQT.Countdown);
    } else {
      cd.setSeconds(cd.getSeconds() + parseInt(QuizAttempt.quiz?.duration || "0") * 60);
    }
    setQuizDurationCountdown(cd);
  }
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
  useEffect(() => {
    if (!QuizAttempt) { return; }
    RunDuration();
  }, [QuizAttempt]);
  useIonViewWillLeave(() => {
    clearInterval(countdownTimer);
  })
  useIonViewDidEnter(() => {
    if (!QuizAttempt) {
      history.replace('/tabs/portal')
      return
    }
    QuizInit();
    // PostQuizAttempt(quid);
    return;


    //         } else {
    //           setQuizData(null);
    //           history.push("/");
    //           throw new Error((res && res.message) || "Server Bermasalah");
    //         }
    //       });
    //   } else {
    //     setQuizData(null);
    //     history.goBack();
    //     throw new Error((res && res.message) || "Server Bermasalah");
    //   }
    // })
    // .catch((err) => {
    //   alert(err);
    //   // setQuizList(null);
    // });
  });
  const submitQuiz = () => {
    setShowLoading(true);
    const BodyData = new FormData();
    BodyData.append("token", (authData && authData.token) || "");
    BodyData.append("rid", QuizAttempt?.quiz?.rid || "");
    BodyData.append(
      "individual_time",
      "[1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5]"
    );
    BodyData.append("answers", JSON.stringify(QuizAnswer[parseInt(param.quid)]));
    BodyData.append("question_total", QuizAnswer[parseInt(param.quid)].length.toString());
    fetch(
      authData
        ? BaseUrl + "quiz/submitquiz"
        : BaseUrl + "quizpublic/submitquiz",
      {
        method: "POST",
        body: BodyData,
      }
    )
      .then((res) => {
        setShowLoading(false);

        if (!res.ok) {
          throw new Error("Server Bermasalah");
        }
        return res.json();
      })
      .then((res) => {
        let DataArray = JSON.parse(localStorage.getItem("_cap_AnswerData") || "");
        delete DataArray[param.quid];
        localStorage.setItem("_cap_AnswerData", JSON.stringify(DataArray));

        history.replace("/quiz/result/" + QuizAttempt.quiz?.rid);
      })
      .catch((err) => {
        history.push("/");
        alert(err);
        // setQuizList(null);
      });
  };
  const NextPage = () => {
    slideQuizRef.current?.slideNext();
    if (RecentQuestionNumber !== QuizAnswer[parseInt(param.quid)].length - 1) {
      setRecentQuestionNumber(RecentQuestionNumber + 1);
      setRecentQuestion(QuizAttempt.questions?.[RecentQuestionNumber + 1]);
    } else {
      setRecentQuestionNumber(QuizAnswer[parseInt(param.quid)].length - 1);
      setRecentQuestion(undefined);
      setTimeout(() => {
        // setRecentQuestionNumber(Answers.length - 1);
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
  const setReviewLater = () => {
    const AnswersArray = QuizAnswer[parseInt(param.quid)];
    AnswersArray[RecentQuestionNumber].AnswerStatus = "reviewlater";
    NextPage();
    setQuizAnswer([...QuizAnswer, QuizAnswer[parseInt(param.quid)]]);
    SaveLocalAnswer(AnswersArray);
  };
  const setSkipped = () => {
    const AnswersArray = QuizAnswer[parseInt(param.quid)];
    AnswersArray[RecentQuestionNumber].AnswerStatus = "skipped";
    NextPage();
    setQuizAnswer([...QuizAnswer, QuizAnswer[parseInt(param.quid)]]);
    SaveLocalAnswer(AnswersArray);
  };
  const SaveLocalAnswer = (data: QuizAnswer[]) => {
    const GetAD = localStorage.getItem("_cap_AnswerData");
    if (GetAD) {
      let AD: QuizAnswer[][] = JSON.parse(GetAD);
      AD[parseInt(param.quid)] = data;
      setQuizAnswer(AD);
    }
  };
  useEffect(() => {

  }, [QuizAnswer])
  if (QuizAttempt) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/portal"></IonBackButton>
              <IonButton>
                <IonIcon icon={stopwatchOutline}></IonIcon>
              </IonButton>
            </IonButtons>
            <IonTitle className="ion-no-padding">
              <b>
                {/* {timeLeft.minutes !== undefined
                  ? (timeLeft.minutes < 10
                      ? "0" + timeLeft.minutes
                      : timeLeft.minutes) +
                    ":" +
                    (timeLeft.seconds < 10
                      ? "0" + timeLeft.seconds
                      : timeLeft.seconds)
                  : "Expired"} */}

                {/* {QuizDuration} */}
              </b>
              <Countdown value={QuizDurationCountdown} onFinish={onFinish} />
              {/* <QuizTimer expiryTimestamp={QuizDuration} /> */}
            </IonTitle>
            <IonButtons slot="end">
              <IonButton
                color="danger"
                onClick={() => {
                  submitQuiz();
                }}
              >
                Submit Quiz
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
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
          {/* <QuizAttemptComponent></QuizAttemptComponent> */}
          <IonLoading isOpen={showLoading} message={"Proses..."} />
        </IonContent>
        <IonFooter className="ion-padding quizanswer">
          {/* {QuizData && QuizData.options && RecentQuestion
            ? QuizData.options
                .filter((o: any) => o.qid === RecentQuestion.qid)
                .map((oItem: any, oIndex: any) => (
                  <IonCard
                    className={
                      Answers
                        ? oItem.oid === Answers[RecentQuestionNumber].Answer
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
                          <IonCol size="2">{oIndex===0?"A":oIndex===1?"B":oIndex===2?"C":oIndex===3?"D":"E"}</IonCol>
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
            : ""} */}
          {/* <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton
                  color="warning"
                  disabled={
                    QuizAnswer[parseInt(param.quid)] &&
                    QuizAnswer[parseInt(param.quid)][RecentQuestionNumber] &&
                    QuizAnswer[parseInt(param.quid)][RecentQuestionNumber].AnswerStatus !== "notvisited"
                  }
                  size="small"
                  expand="full"
                  onClick={() => {
                    setReviewLater();
                  }}
                >
                  Review Later
                </IonButton>
              </IonCol>
              <IonCol>
                <IonButton
                  disabled={
                    QuizAnswer[parseInt(param.quid)] &&
                    QuizAnswer[parseInt(param.quid)][RecentQuestionNumber] &&
                    QuizAnswer[parseInt(param.quid)][RecentQuestionNumber].AnswerStatus !== "notvisited"
                  }
                  color="medium"
                  size="small"
                  expand="full"
                  onClick={() => {
                    setSkipped();
                  }}
                >
                  Skip
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid> */}
          <IonSlides options={slideQuiz} ref={slideQuizRef}>
            {QuizAttempt.questions
              ? QuizAttempt.questions.map((item: any, index: any) => (
                <IonSlide key={index}>
                  <IonButton
                    className="quizNumberButton"
                    size="small"
                    color={
                      index === RecentQuestionNumber
                        ? "light"
                        : QuizAnswer[parseInt(param.quid)] &&
                          QuizAnswer[parseInt(param.quid)][index] &&
                          QuizAnswer[parseInt(param.quid)][index].AnswerStatus === "answered"
                          ? "success"
                          : QuizAnswer[parseInt(param.quid)] &&
                            QuizAnswer[parseInt(param.quid)][index] &&
                            QuizAnswer[parseInt(param.quid)][index].AnswerStatus === "skipped"
                            ? "medium"
                            : QuizAnswer[parseInt(param.quid)] &&
                              QuizAnswer[parseInt(param.quid)][index] &&
                              QuizAnswer[parseInt(param.quid)][index].AnswerStatus === "reviewlater"
                              ? "warning"
                              : "dark"
                    }
                    onClick={() => {
                      setRecentQuestionNumber(index);
                      setRecentQuestion(item);
                    }}
                  >
                    {index + 1}
                  </IonButton>
                </IonSlide>
              ))
              : ""}
          </IonSlides>
        </IonFooter>
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
    authData: state.base.authData,
    QuizAttempt: state.quiz.QuizAttempt,
    QuizAnswer: state.quiz.QuizAnswer
  }),
  mapDispatchToProps: {
    setQuizAnswer
  },
  component: Quiz,
});