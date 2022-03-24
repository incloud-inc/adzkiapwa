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
  IonLoading,
  IonPage,
  IonProgressBar,
  IonRow,
  IonSlide,
  IonSlides,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  useIonViewWillEnter,
} from "@ionic/react";
import { reload, stopwatchOutline } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps, useParams } from "react-router";
import { message, Statistic } from "antd";
import GeneralSkeleton from "../../components/Shared/GeneralSkeleton";
import { connect } from "../../data/connect";
import { setAuthData } from "../../data/user/user.actions";
import Lottie from "react-lottie-player";
import SuccessLottie from "../../lotties/Success.json";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  authData: any;
}

interface DispatchProps {}

interface ResultProps extends OwnProps, StateProps, DispatchProps {}
const slideQuiz = {
  initialSlide: 0,
  slidesPerView: 10,
  speed: 400,
  spaceBetween: 20,
};
const Result: React.FC<ResultProps> = ({ authData, history }) => {
  let param: any = useParams();

  const [showLoading, setShowLoading] = useState(false);
  const slideQuizRef = useRef<HTMLIonSlidesElement>(null);
  const [ResultData, setResultData] = useState<any>(undefined);
  const fetchResult = () => {
    const BodyData = new FormData();
    if (authData) {
      BodyData.append("token", authData && authData.token);
    }
    BodyData.append("rid", param.rid || "");
    fetch(
      authData
        ? "https://api3.adzkia.id/quiz/resultdetail"
        : "https://api3.adzkia.id/quizpublic/resultdetail",
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
        if (res.result && res.result.rid) {
          setResultData(res.result);
        } else {
          history.replace("/tabs/examresults");
          setResultData(null);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  useIonViewWillEnter(() => {
    fetchResult();
  });
  if (ResultData) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/portal"></IonBackButton>
            </IonButtons>
            <IonTitle className="ion-no-padding">Hasil Ujian</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="bg-gray ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <Lottie
                  animationData={SuccessLottie}
                  play={true}
                  style={{ marginTop: "-100px" }}
                ></Lottie>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonLoading isOpen={showLoading} message={"Proses..."} />
        </IonContent>
      </IonPage>
    );
  } else if (ResultData === null) {
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
  component: Result,
});
