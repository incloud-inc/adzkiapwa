import { CameraResultType, Plugins } from "@capacitor/core";
import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonProgressBar,
  IonRow,
  IonSlide,
  IonSlides,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";
import { reload, stopwatchOutline } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps, useParams } from "react-router";
import QuizAttempt from "../../components/Quiz/QuizAttempt";
import GeneralSkeleton from "../../components/Shared/GeneralSkeleton";
import { connect } from "../../data/connect";
// import "./Account.scss";
import { setAuthData } from "../../data/user/user.actions";
const Camera = Plugins.Camera;
// const CRT = CameraResultType.Uri;
interface OwnProps extends RouteComponentProps {}

interface StateProps {
  authData: any;
}

interface DispatchProps {
  setAuthData: typeof setAuthData;
}

interface AccountProps extends OwnProps, StateProps, DispatchProps {}
const slideQuiz = {
  initialSlide: 0,
  slidesPerView: 10,
  speed: 400,
  spaceBetween: 20,
};

const Quiz: React.FC<AccountProps> = ({ setAuthData, authData, history }) => {
  let param: any = useParams();
  const [RecentQuestionNumber, setRecentQuestionNumber] = useState<number>(0);
  const [RecentQuestion, setRecentQuestion] = useState<any>(null);
  const [Answers, setAnswers] = useState<any>(null);
  const [QuizData, setQuizData] = useState<any>(undefined);
  const [AnsweredQuestionTotal, setAnsweredQuestionTotal] = useState<any>(0);
  const slideQuizRef = useRef<HTMLIonSlidesElement>(null);
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

    d2.setMinutes(d1.getMinutes() + parseInt(QuizData.quiz.duration));

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
    if (QuizData && QuizData.quiz && QuizData.quiz.duration) {
      let timer: any = null;
      if (timeLeft.minutes !== undefined) {
        timer = setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
      }
      return () => clearTimeout(timer);
    }
  }, [QuizData]);
  const [showAlert, setShowAlert] = useState(false);
  const [ava, setAva] = useState(
    (authData && authData.photo) ||
      "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
  );
  useIonViewDidEnter(() => {
    const BodyData = new FormData();
    BodyData.append("token", (authData && authData.token) || "");
    BodyData.append("quid", param.quid || "");
    fetch(
      authData
        ? "https://api3.adzkia.id/quiz/validatequiz"
        : "https://api3.adzkia.id/quizpublic/validatequiz",
      {
        method: "POST",
        body: BodyData,
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Server Bermasalah");
        }
        return res.json();
      })
      .then((res) => {
        if (res && res.rid) {
          const BodyData2 = new FormData();
          if (authData) {
            BodyData2.append("token", authData && authData.token);
          }
          BodyData2.append("rid", res.rid || "");
          fetch(
            authData
              ? "https://api3.adzkia.id/quiz/attempt"
              : "https://api3.adzkia.id/quizpublic/attempt",
            {
              method: "POST",
              body: BodyData2,
            }
          )
            .then((res) => {
              if (!res.ok) {
                throw new Error("Server Bermasalah");
              }
              return res.json();
            })
            .then((res) => {
              if (res && !res.message) {
                setQuizData(res);
                setRecentQuestion(res.questions[0]);
                let AnswersArray = new Array();
                res.questions.forEach((q: any, index: any) => {
                  AnswersArray.push({
                    AnswerIndex: index,
                    qid: q.qid,
                    Answer: "",
                    AnswerStatus: index === 0 ? "notvisited" : "notvisited",
                  });
                });
                setAnswers(AnswersArray);
              } else {
                setQuizData(null);
                history.push("/");
                throw new Error((res && res.message) || "Server Bermasalah");
              }
            });
        } else {
          setQuizData(null);
          history.push("/");
          throw new Error((res && res.message) || "Server Bermasalah");
        }
      })
      .catch((err) => {
        alert(err);
        // setQuizList(null);
      });
  });
  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      width: 300,
      height: 300,
      resultType: CameraResultType.Base64,
    });

    setAva("data:image/png;base64, " + image.base64String);
  };
  const NextPage = () => {
    slideQuizRef.current?.slideNext();
    if (RecentQuestionNumber !== Answers.length - 1) {
      setRecentQuestionNumber(RecentQuestionNumber + 1);
      setRecentQuestion(QuizData.questions[RecentQuestionNumber + 1]);
    } else {
      setRecentQuestionNumber(Answers.length - 1);
      setRecentQuestion(null);
      setTimeout(() => {
        // setRecentQuestionNumber(Answers.length - 1);
        setRecentQuestion(QuizData.questions[Answers.length - 1]);
      }, 1000);
    }
  };
  const setAnswer = (AIndex: number, AID: string) => {
    const AnswersArray = Answers;
    AnswersArray[AIndex].Answer = AID;
    AnswersArray[AIndex].AnswerStatus = "answered";
    setAnswers(AnswersArray);
    setAnsweredQuestionTotal(AnsweredQuestionTotal + 1);
    NextPage();
  };
  const setReviewLater = () => {
    const AnswersArray = Answers;
    AnswersArray[RecentQuestionNumber].AnswerStatus = "reviewlater";
    NextPage();
    setAnswers(AnswersArray);
  };
  const setSkipped = () => {
    const AnswersArray = Answers;
    AnswersArray[RecentQuestionNumber].AnswerStatus = "skipped";
    NextPage();
    setAnswers(AnswersArray);
  };

  if (QuizData) {
    return (
      <IonPage id="account-page">
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
                {timeLeft.minutes !== undefined
                  ? (timeLeft.minutes < 10
                      ? "0" + timeLeft.minutes
                      : timeLeft.minutes) +
                    ":" +
                    (timeLeft.seconds < 10
                      ? "0" + timeLeft.seconds
                      : timeLeft.seconds)
                  : "Expired"}
              </b>
            </IonTitle>
            <IonButtons slot="end">
              <IonButton
                color="danger"
                onClick={() => {
                  console.log(Answers);
                }}
              >
                Submit Quiz
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="bg-gray ion-padding">
          <IonProgressBar
            value={Answers ? (1 / Answers.length) * AnsweredQuestionTotal : 0}
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
          {QuizData && QuizData.options && RecentQuestion
            ? QuizData.options
                .filter((o: any) => o.qid === RecentQuestion.qid)
                .map((oItem: any, oIndex: any) => (
                  <IonCard
                    key={oIndex}
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
          <QuizAttempt QuizData={QuizData}></QuizAttempt>
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
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonButton
                  color="warning"
                  disabled={
                    Answers &&
                    Answers[RecentQuestionNumber] &&
                    Answers[RecentQuestionNumber].AnswerStatus !== "notvisited"
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
                    Answers &&
                    Answers[RecentQuestionNumber] &&
                    Answers[RecentQuestionNumber].AnswerStatus !== "notvisited"
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
          </IonGrid>
          <IonSlides options={slideQuiz} ref={slideQuizRef}>
            {QuizData && QuizData.questions
              ? QuizData.questions.map((item: any, index: any) => (
                  <IonSlide key={index}>
                    <IonButton
                      className="quizNumberButton"
                      size="small"
                      color={
                        index === RecentQuestionNumber
                          ? "light"
                          : Answers &&
                            Answers[index] &&
                            Answers[index].AnswerStatus === "answered"
                          ? "success"
                          : Answers &&
                            Answers[index] &&
                            Answers[index].AnswerStatus === "skipped"
                          ? "medium"
                          : Answers &&
                            Answers[index] &&
                            Answers[index].AnswerStatus === "reviewlater"
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
  } else if (QuizData === null) {
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
    authData: state.user.authData,
  }),
  mapDispatchToProps: {
    setAuthData,
  },
  component: Quiz,
});
