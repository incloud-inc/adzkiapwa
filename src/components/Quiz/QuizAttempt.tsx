import {
  IonAlert,
  IonBadge,
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItemDivider,
  IonLabel,
  IonModal,
  IonRow,
  IonText,
  useIonViewDidEnter,
} from "@ionic/react";
import { chevronForwardCircle, star } from "ionicons/icons";
import React, { useState } from "react";
import Lottie from "react-lottie-player";
import { RouteComponentProps, withRouter } from "react-router";
import GeneralSkeleton from "../Shared/GeneralSkeleton";
import Task from "../../lotties/Task.json";

interface OwnProps {
  QuizData: any;
}
interface QuizAttemptProps extends RouteComponentProps, OwnProps {}
const QuizAttempt: React.FC<QuizAttemptProps> = ({ history, QuizData }) => {
  const QT = localStorage.getItem("QuizTime")
    ? JSON.parse(localStorage.getItem("QuizTime") || "")
    : "";
  const getQT: any = QT
    ? QT.find((x: { QuizId: string }) => x.QuizId === "6")
    : undefined;
  const [showAlert, setShowAlert] = useState(false);
  const [gid, setGid] = useState(null);
  const [ShowModal, setShowModal] = useState(getQT ? false : true);
  return (
    <IonModal isOpen={ShowModal}>
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
              <h3 className="ion-no-margin">{QuizData.quiz.quiz_name || ""}</h3>
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
                  __html: QuizData.quiz.description || "",
                }}
              ></div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="4">
              <IonText>Durasi</IonText>
            </IonCol>
            <IonCol size="8">
              <IonText>: {QuizData.quiz.duration || ""} menit</IonText>
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

                  history.replace("/");
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
export default withRouter(QuizAttempt);
