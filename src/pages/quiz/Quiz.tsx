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
import React, { useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router";
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
  initialSlide: 1,
  slidesPerView: 10,
  speed: 400,
};

const Quiz: React.FC<AccountProps> = ({ setAuthData, authData, history }) => {
  let param: any = useParams();
  const calculateTimeLeft = () => {
    let difference = +new Date("December 15, 2021 03:00:00") - +new Date();
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
  const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft());
  useEffect(() => {
    let timer: any = null;
    if (timeLeft.minutes !== undefined) {
      timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
    }
    return () => clearTimeout(timer);
  });
  const [showAlert, setShowAlert] = useState(false);
  const [ava, setAva] = useState(
    (authData && authData.photo) ||
      "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
  );
  useIonViewDidEnter(() => {
    if (!authData) {
      setAuthData(undefined);
      alert("Anda Belum Login");
      history.replace("/tabs/portal");
    } else {
      const BodyData = new FormData();
      BodyData.append("token", authData.token || "");
      BodyData.append("quid", param.quid || "");
      fetch("https://api3.adzkia.id/quiz/detail", {
        method: "POST",
        body: BodyData,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Server Bermasalah");
          }
          return res.json();
        })
        .then((res) => {
          if (res && res.quid) {
          }
        })
        .catch((err) => {
          alert(err);
          // setQuizList(null);
        });
    }
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
            <IonButton color="danger">Submit Quiz</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="bg-gray ion-padding">
        <IonProgressBar value={0.1} color="dark"></IonProgressBar>

        <h2>
          <b>Nomor 50</b>
        </h2>
        <IonText>Biology & The Science Method</IonText>
        <h2>
          Ini adalah contoh pertanyaan yang akan diajukan oleh pembuat soal dan
          kamu wajib jawab
        </h2>
      </IonContent>
      <IonFooter className="ion-padding quizanswer">
        <IonCard className="quizanswer-active">
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="2">A</IonCol>
                <IonCol size="10">Blue Dye</IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="2">B</IonCol>
                <IonCol size="10">Blue Dye</IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="2">C</IonCol>
                <IonCol size="10">Blue Dye</IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="2">D</IonCol>
                <IonCol size="10">Blue Dye</IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="2">E</IonCol>
                <IonCol size="10">Blue Dye</IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
        <IonSlides options={slideQuiz}>
          <IonSlide>
            <IonButton size="small" color="dark">
              1
            </IonButton>
          </IonSlide>
          <IonSlide>
            <IonButton size="small" color="dark">
              2
            </IonButton>
          </IonSlide>
          <IonSlide>
            <IonButton size="small" color="light">
              3
            </IonButton>
          </IonSlide>
          <IonSlide>
            <IonButton size="small" color="dark">
              4
            </IonButton>
          </IonSlide>
          <IonSlide>
            <IonButton size="small" color="dark">
              5
            </IonButton>
          </IonSlide>
          <IonSlide>
            <IonButton size="small" color="dark">
              6
            </IonButton>
          </IonSlide>
          <IonSlide>
            <IonButton size="small" color="dark">
              7
            </IonButton>
          </IonSlide>
          <IonSlide>
            <IonButton size="small" color="dark">
              1
            </IonButton>
          </IonSlide>
          <IonSlide>
            <IonButton size="small" color="dark">
              2
            </IonButton>
          </IonSlide>
          <IonSlide>
            <IonButton size="small" color="dark">
              3
            </IonButton>
          </IonSlide>
          <IonSlide>
            <IonButton size="small" color="dark">
              4
            </IonButton>
          </IonSlide>
          <IonSlide>
            <IonButton size="small" color="dark">
              5
            </IonButton>
          </IonSlide>
          <IonSlide>
            <IonButton size="small" color="dark">
              6
            </IonButton>
          </IonSlide>
          <IonSlide>
            <IonButton size="small" color="dark">
              7
            </IonButton>
          </IonSlide>
        </IonSlides>
        <div className="ion-text-center ion-padding-top">
          <IonBadge color="danger">not visited</IonBadge>
          <IonBadge color="success">answered</IonBadge>
          <IonBadge color="warning">review later</IonBadge>
          <IonBadge color="dark">skipped</IonBadge>
        </div>
      </IonFooter>
    </IonPage>
  );
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
