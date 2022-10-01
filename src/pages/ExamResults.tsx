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
    fetch("https://api.adzkia.id/quiz/resultlist", {
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
        if (res.quizzes && res.quizzes.length > 0) {
          setExamResults(res.quizzes);
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
          {ExamResults.map((item: any, index: any) => (
            <IonCard>
              <IonCardContent>
                <IonRow>
                  <IonCol> Paket Tryout {index + 1}</IonCol>
                  <IonCol size="3"> Nilai : 9{index}</IonCol>
                </IonRow>
              </IonCardContent>
            </IonCard>
          ))}
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
          <div className="ion-text-center ion-padding">
            <IonText>Belum pernah submit quiz</IonText>
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
