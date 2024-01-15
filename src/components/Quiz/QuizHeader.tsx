import {
  IonBackButton,
  IonButton, IonButtons, IonHeader, IonIcon, IonLoading, IonTitle, IonToolbar, useIonViewWillLeave
} from "@ionic/react";
import Countdown from "antd/lib/statistic/Countdown";
import { stopwatchOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, useParams, withRouter } from "react-router";
import { BaseUrl } from "../../AppConfig";
import { connect } from "../../data/connect";
import { PostQuizList, setSelectedQuiz } from "../../data/quiz/quiz.actions";
import { AuthData } from "../../models/Base";
import { QuizAnswer, QuizAttempt } from "../../models/Quiz";
  interface OwnProps {
  }
  interface StateProps {
    QuizAttempt: QuizAttempt;
    authData: AuthData;
    QuizAnswer: QuizAnswer[][];
  }
  
  interface DispatchProps {
    PostQuizList:typeof PostQuizList;
    setSelectedQuiz:typeof setSelectedQuiz;
  }
  interface QuizSubmitProps
    extends OwnProps,
      StateProps,
      DispatchProps,
      RouteComponentProps {}
  var countdownTimer: any;
  let TimeSaver = 0;
  interface QuizTime {
    Countdown: number,
    QuizId?: string
  }
  interface Param {
    quid: string
  }
  const QuizHeader: React.FC<QuizSubmitProps> = ({ history,authData, QuizAttempt,QuizAnswer}) => {
    let param: Param = useParams();
    const [showLoading, setShowLoading] = useState(false);

    const [QuizDurationCountdown, setQuizDurationCountdown] = useState<any>(
      new Date()
    );
    const [QuizDuration, setQuizDuration] = useState(0);
    const QT = localStorage.getItem("QuizTime");

  const parsedQT: any = QT ? JSON.parse(QT) : [];
  const getQT: any = parsedQT ? parsedQT.find((x: any) => x.QuizId == param.quid) : undefined;
    useEffect(() => {
      if (!countdownTimer) {
      }
    }, [QuizDuration]);
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
      new Response(BodyData).text().then(console.log);
      setShowLoading(false)
      return;
      
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
          let timeArray:QuizTime[] = JSON.parse(localStorage.getItem("QuizTime") || "");
          delete DataArray[param.quid];
          timeArray = timeArray.filter((element) => element.QuizId != param.quid);
          localStorage.setItem("QuizTime", JSON.stringify(timeArray));
          localStorage.setItem("_cap_AnswerData", JSON.stringify(DataArray));
  
          history.replace("/quiz/result/" + QuizAttempt.quiz?.rid);
        })
        .catch((err) => {
          history.push("/");
          alert(err);
        });
    };
      const onFinish = () => {
        submitQuiz();
      };
      useEffect(() => {
        if (!QuizAttempt) { return; }
        RunDuration();
      }, [QuizAttempt]);
      useIonViewWillLeave(() => {
        clearInterval(countdownTimer);
      })
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
      return (
        <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/portal"></IonBackButton>
            <IonButton>
              <IonIcon icon={stopwatchOutline}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle className="ion-no-padding">
            <Countdown value={QuizDurationCountdown} onFinish={onFinish} />
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
        <IonLoading isOpen={showLoading} message={"Proses..."} />
      </IonHeader>
        // <IonButton onClick={() => onClickButton('textku')}>{text}</IonButton>
      );
  };
  
  export default connect<OwnProps, StateProps, DispatchProps>({
    mapStateToProps: (state) => ({
      QuizAttempt: state.quiz.QuizAttempt,
      QuizAnswer: state.quiz.QuizAnswer,
      authData:state.quiz.authData
    }),
    mapDispatchToProps: {PostQuizList,setSelectedQuiz},
    component: withRouter(QuizHeader),
  });
  