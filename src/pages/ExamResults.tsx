import {
  IonBackButton,
  IonBadge,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";
import { star } from "ionicons/icons";
import React, { useState } from "react";
import Lottie from "react-lottie-player";
import { RouteComponentProps, useParams, withRouter } from "react-router";
import GeneralSkeleton from "../components/Shared/GeneralSkeleton";
import { connect } from "../data/connect";
import Student from "../lotties/Student.json";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  authData: any;
}

interface DispatchProps {}
interface ExamResultsProps extends OwnProps, StateProps, DispatchProps {}

const ExamResults: React.FC<ExamResultsProps> = ({ history, authData }) => {
  const [ExamResults, setExamResults] = useState<any>(undefined);
  //   const param<any> = useParams();
  let param: any = useParams();
  useIonViewDidEnter(() => {
    const BodyData = new FormData();
    if (authData) {
      BodyData.append("token", authData && authData.token);
    }
    BodyData.append("gid", param.id || "");
    fetch("https://api3.adzkia.id/payment/history", {
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
        if (res.result && res.result.gid) {
          setExamResults(res.result);
        } else {
          setExamResults(null);
        }
      })
      .catch((err) => {
        alert(err);
      });
  });
  if (ExamResults) {
    return (
      <IonPage id="session-detail-page ">
        <IonToolbar>
          {/* <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/portal"></IonBackButton>
          </IonButtons> */}
          <IonTitle>Hasil Ujian</IonTitle>
        </IonToolbar>
        <IonContent className="bg-gray">
          <IonCard className="br-16 ion-p-8 ion-margin no-shadow">
            <IonGrid>
              <IonRow class="ion-align-items-center">
                {" "}
                <IonCol size="2">
                  <IonBadge color="primary" className="ion-p-8 br-8">
                    <IonIcon icon={star} color="light"></IonIcon>
                  </IonBadge>
                </IonCol>
                <IonCol size="6">
                  <h5 className="ion-no-margin color-navy">
                    <b>{ExamResults.group_name || ""}</b>
                  </h5>
                </IonCol>
                <IonCol size="4" className="ion-text-right">
                  <h5 className="ion-no-margin color-navy">
                    <b>
                      {ExamResults.price !== "0"
                        ? "Rp " + ExamResults.price
                        : "GRATIS"}
                    </b>
                  </h5>
                </IonCol>
              </IonRow>
              <IonRow
                className="ion-padding-top ion-padding-bottom"
                hidden={!ExamResults.description}
              >
                <IonCol>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: ExamResults.description || "",
                    }}
                  ></div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
          <div className="ion-margin">
            <IonText color="medium">
              <b>Hasil Ujian</b>
            </IonText>
          </div>
        </IonContent>
      </IonPage>
    );
  } else if (ExamResults === null) {
    return (
      <IonPage>
        <IonToolbar>
          {/* <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/portal"></IonBackButton>
          </IonButtons> */}
          <IonTitle>Hasil Ujian</IonTitle>
        </IonToolbar>
        <IonContent className="bg-gray">
          <IonCard>
            <IonCardContent>
              <IonRow>
                <IonCol size="3">
                  <Lottie animationData={Student} play={true}></Lottie>
                </IonCol>
                <IonCol>
                  <IonRow>
                    <IonCol>Rata-rata</IonCol>
                    <IonCol size="3">: 8.5</IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>Jumlah Quiz</IonCol>
                    <IonCol size="3">: 10</IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>Jumlah Percobaan</IonCol>
                    <IonCol size="3">: 20</IonCol>
                  </IonRow>
                </IonCol>
              </IonRow>
            </IonCardContent>
          </IonCard>
          {[...Array(9)].map((item, index) => (
            <IonCard>
              <IonCardContent>
                <IonRow>
                  <IonCol> Paket Tryout {index + 1}</IonCol>
                  <IonCol size="3"> Nilai : 9{index}</IonCol>
                </IonRow>
              </IonCardContent>
            </IonCard>
          ))}
          <div hidden className="ion-text-center ion-padding">
            <IonText>Data Tidak ditemukan</IonText>
          </div>
        </IonContent>
      </IonPage>
    );
  } else {
    return (
      <>
        <IonPage>
          <GeneralSkeleton></GeneralSkeleton>
        </IonPage>
      </>
    );
  }
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    authData: state.user.authData,
  }),
  // mapDispatchToProps: {
  //   setAuthData,
  // },
  component: ExamResults,
});
