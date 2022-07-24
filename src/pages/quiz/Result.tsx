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
import {
  briefcase,
  camera,
  cart,
  radio,
  reload,
  stopwatchOutline,
} from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps, useParams } from "react-router";
import { message, Statistic } from "antd";
import GeneralSkeleton from "../../components/Shared/GeneralSkeleton";
import { connect } from "../../data/connect";
import { setAuthData } from "../../data/user/user.actions";
import Lottie from "react-lottie-player";
import SuccessLottie from "../../lotties/Success.json";
import "./Result.scss";
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
    alert("Hasil ujian bisa dilihat di blog.adzkia.id");

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
          history.replace("/tabs/portal");
          setResultData(null);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  useIonViewWillEnter(() => {
    // fetchResult();
  });
  if (!ResultData) {
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
        <IonContent className="bg-white">
          <IonGrid className="bg-gray ion-padding">
            <IonRow>
              <IonCol>
                <Lottie
                  animationData={SuccessLottie}
                  play={true}
                  style={{ marginTop: "-80px", marginBottom: "-80px" }}
                ></Lottie>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="6">Rata-rata</IonCol>
              <IonCol size="6">: 8.250</IonCol>
              <IonCol size="6">Jumlah Quiz</IonCol>
              <IonCol size="6">: 10</IonCol>
              <IonCol size="6">Jumlah Percobaan</IonCol>
              <IonCol size="6">: 20</IonCol>
            </IonRow>
          </IonGrid>
          <div className="bg-gray resultDetailCard">
            <IonGrid className="bg-white ion-padding">
              <IonRow>
                <IonCol size="12">
                  <IonText color="medium">Ujian yang dicoba</IonText>
                </IonCol>
              </IonRow>
              <IonRow class="ion-align-items-center">
                <IonCol size="2">
                  <IonIcon icon={cart} size="large"></IonIcon>
                </IonCol>
                <IonCol size="5">
                  <IonText color="medium">
                    <b>Nama Ujian</b>
                  </IonText>
                  <br />
                  <IonText color="medium">ID Ujian</IonText>
                </IonCol>
                <IonCol size="5" className="ion-text-right">
                  <IonText color="medium">
                    <b>NILAI</b>
                  </IonText>
                  <br />
                  <IonText color="medium">Ranking</IonText>
                </IonCol>
              </IonRow>
              <IonRow class="ion-align-items-center">
                <IonCol size="2">
                  <IonIcon icon={radio} size="large"></IonIcon>
                </IonCol>
                <IonCol size="5">
                  <IonText color="medium">
                    <b>Ujian lainnya</b>
                  </IonText>
                  <br />
                  <IonText color="medium">15 Jan</IonText>
                </IonCol>
                <IonCol size="5" className="ion-text-right">
                  <IonText color="medium">
                    <b>100.000</b>
                  </IonText>
                  <br />
                  <IonText color="medium">Futsal</IonText>
                </IonCol>
              </IonRow>
              <IonRow class="ion-align-items-center">
                <IonCol size="2">
                  <IonIcon icon={camera} size="large"></IonIcon>
                </IonCol>
                <IonCol size="5">
                  <IonText color="medium">
                    <b>Ujian berikutnya</b>
                  </IonText>
                  <br />
                  <IonText color="medium">18 Agu</IonText>
                </IonCol>
                <IonCol size="5" className="ion-text-right">
                  <IonText color="medium">
                    <b>400.000</b>
                  </IonText>
                  <br />
                  <IonText color="medium">Badminton</IonText>
                </IonCol>
              </IonRow>
              <IonRow class="ion-align-items-center">
                <IonCol size="2">
                  <IonIcon icon={briefcase} size="large"></IonIcon>
                </IonCol>
                <IonCol size="5">
                  <IonText color="medium">
                    <b>Try out</b>
                  </IonText>
                  <br />
                  <IonText color="medium">17 Nov</IonText>
                </IonCol>
                <IonCol size="5" className="ion-text-right">
                  <IonText color="medium">
                    <b>300.000</b>
                  </IonText>
                  <br />
                  <IonText color="medium">Footbal</IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
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
