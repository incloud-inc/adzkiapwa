import {
  IonBadge,
  IonButton, IonCol,
  IonContent,
  IonGrid,
  IonIcon, IonModal,
  IonRow,
  IonText
} from "@ionic/react";
import { chevronForwardCircle } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { RouteComponentProps, useLocation, withRouter } from "react-router";
import { connect } from "../../data/connect";
import Task from "../../lotties/Task.json";
import { QuizAttempt } from "../../models/Quiz";

interface OwnProps {
}

interface StateProps {
  // QuizAttempt: QuizAttempt;
}

interface DispatchProps {
}
interface QuizAttemptProps
  extends OwnProps,
    StateProps,
    DispatchProps,
    RouteComponentProps {}
interface QuizAttemptProps extends RouteComponentProps, OwnProps {}
const QuizAttemptComponent: React.FC<QuizAttemptProps> = ({ history }) => {
  const location = useLocation();
    const QuizAttempt:any=[];
  useEffect(() => {
     if(location.pathname.includes("/group/detail")){return}
     setShowModal(false)
  },[location]);
  const QT = localStorage.getItem("QuizTime")
    ? JSON.parse(localStorage.getItem("QuizTime") || "")
    : "";
  const getQT: any = QT
    ? QT.find((x: { QuizId: string }) => x.QuizId === "6")
    : undefined;
  const [showAlert, setShowAlert] = useState(false);
  const [gid, setGid] = useState(null);
  const [ShowModal, setShowModal] = useState(getQT ? true : true);

  return (
      <IonModal isOpen={false} onDidDismiss={() => setShowModal(false)}>
          <IonContent className="ion-padding" fullscreen>
          <br />

          <IonGrid>
            <IonRow>
              <IonCol size="2"></IonCol>
              <IonCol>
                <Lottie animationData={Task} play={true}></Lottie>
              </IonCol>
              <IonCol size="2"></IonCol>
            </IonRow>
            <IonRow className="bb-1 ion-margin-bottom ion-padding-bottom">
              <IonCol size="12" className="ion-text-center">
                <h3 className="ion-no-margin">{QuizAttempt?.quiz?.quiz_name || ""}</h3>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="4">
                <IonText>Deskripsi</IonText>
              </IonCol>
              <IonCol size="8">
                <IonText>: </IonText>
                <div
                  dangerouslySetInnerHTML={{
                    __html: QuizAttempt?.quiz?.description || "",
                  }}
                ></div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="4">
                <IonText>Durasi</IonText>
              </IonCol>
              <IonCol size="8">
                <IonText>: {QuizAttempt?.quiz?.duration || ""} menit</IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="4">
                <IonText>Indikasi Soal</IonText>
              </IonCol>
              <IonCol size="8">
                <IonBadge color="dark" style={{ margin: "4px" }}>
                  not visited
                </IonBadge>
                <IonBadge color="success" style={{ margin: "4px" }}>
                  answered
                </IonBadge>
                <IonBadge color="warning" style={{ margin: "4px" }}>
                  review later
                </IonBadge>
                <IonBadge color="medium" style={{ margin: "4px" }}>
                  skipped
                </IonBadge>
              </IonCol>
              <IonCol size="12 " className="ion-padding-top">
                <IonButton
                  size="large"
                  expand="block"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Mulai Quiz &nbsp;{" "}
                  <IonIcon icon={chevronForwardCircle}></IonIcon>
                </IonButton>
              </IonCol>
              <IonCol size="12 " className="">
                <IonButton
                  size="large"
                  expand="block"
                  color="light"
                  onClick={() => {
                    setShowModal(false);
                    history.goBack();
                  }}
                >
                  Batal
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonModal>
  );
};
export default connect<OwnProps, StateProps, DispatchProps>({
  // mapStateToProps: (state) => ({
  //   QuizAttempt: state.quiz.QuizAttempt
  // }),
  component: withRouter(QuizAttemptComponent),
});