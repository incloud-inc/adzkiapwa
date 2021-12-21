import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonText,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  IonSearchbar,
  IonBadge,
  IonTitle,
} from "@ionic/react";
import { connect } from "../data/connect";
import { withRouter, RouteComponentProps } from "react-router";
import * as selectors from "../data/selectors";
import { starOutline, star, share, cloudDownload } from "ionicons/icons";
import "./SessionDetail.scss";
import { addFavorite, removeFavorite } from "../data/sessions/sessions.actions";
import { Session } from "../models/Schedule";
interface OwnProps extends RouteComponentProps {}

interface StateProps {}

interface DispatchProps {}

type PackageProps = OwnProps & StateProps & DispatchProps;

const Package: React.FC<PackageProps> = ({}) => {
  const [searchText, setSearchText] = useState("");

  return (
    <IonPage id="session-detail-page ">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/tabs/portal"></IonBackButton>
        </IonButtons>
        <IonTitle>Paket</IonTitle>
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
                  <b>SBMPTN 001</b>
                </h5>
              </IonCol>
              <IonCol size="4" className="ion-text-right">
                <h5 className="ion-no-margin color-navy">
                  <b>Gratis</b>
                </h5>
              </IonCol>
            </IonRow>
            <IonRow className="ion-padding-top ion-padding-bottom">
              <IonCol>
                <IonText color="medium">
                  Coba Gratis tanpa daftar, tanpa login, hanya kami yang memang
                  benar-benar berani
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
        <div className="ion-margin">
          <IonText color="medium">
            <b>Materi Pembelajaran</b>
          </IonText>
        </div>
        <IonList lines="full">
          <IonItem>
            <IonBadge color="primary" className="ion-p-8 br-8" slot="start">
              <IonIcon icon={star} color="light"></IonIcon>
            </IonBadge>
            <IonLabel slot="start">Materi Pertama</IonLabel>
          </IonItem>
          <IonItem>
            <IonBadge color="success" className="ion-p-8 br-8" slot="start">
              <IonIcon icon={star} color="light"></IonIcon>
            </IonBadge>
            <IonLabel slot="start">Materi Pertama</IonLabel>
          </IonItem>
          <IonItem>
            <IonBadge color="warning" className="ion-p-8 br-8" slot="start">
              <IonIcon icon={star} color="light"></IonIcon>
            </IonBadge>
            <IonLabel slot="start">Materi Pertama</IonLabel>
          </IonItem>
        </IonList>
        <div className="ion-margin">
          <IonText color="medium">
            <b>Quiz</b>
          </IonText>
        </div>
        <IonList lines="full">
          <IonItem>
            <IonBadge color="primary" className="ion-p-8 br-8" slot="start">
              <IonIcon icon={star} color="light"></IonIcon>
            </IonBadge>
            <IonLabel slot="start">Quiz Pertama</IonLabel>
          </IonItem>
          <IonItem>
            <IonBadge color="success" className="ion-p-8 br-8" slot="start">
              <IonIcon icon={star} color="light"></IonIcon>
            </IonBadge>
            <IonLabel slot="start">Quiz Pertama</IonLabel>
          </IonItem>
          <IonItem>
            <IonBadge color="warning" className="ion-p-8 br-8" slot="start">
              <IonIcon icon={star} color="light"></IonIcon>
            </IonBadge>
            <IonLabel slot="start">Quiz Pertama</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({}),
  mapDispatchToProps: {},
  component: withRouter(Package),
});
