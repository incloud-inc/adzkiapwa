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
} from "@ionic/react";
import { connect } from "../data/connect";
import { withRouter, RouteComponentProps } from "react-router";
import * as selectors from "../data/selectors";
import { starOutline, star, share, cloudDownload } from "ionicons/icons";
import "./SessionDetail.scss";
import { addFavorite, removeFavorite } from "../data/sessions/sessions.actions";
import { Session } from "../models/Schedule";
import Lottie from "react-lottie-player";
import Welcome from "../lotties/sma.json";
import GroupList from "../components/Group/GroupList";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  authData: any;
}

interface DispatchProps {}

type PortalProps = OwnProps & StateProps & DispatchProps;

const Portal: React.FC<PortalProps> = ({ history, authData }) => {
  const [searchText, setSearchText] = useState("");
  return (
    <IonPage id="session-detail-page ">
      <IonHeader className="bg-gray no-shadow ion-padding-start ion-padding-end ion-padding-top">
        <IonCard
          hidden={authData}
          className="br-16 no-shadow ion-p-8"
          style={{ position: "sticky" }}
        >
          <IonGrid>
            <IonRow>
              <IonCol size="6" className="ion-p-8">
                <img src="/assets/img/brand/logo adzkia.png" width="80%" />
              </IonCol>
              <IonCol className="ion-text-right">
                <IonButton
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  Login
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
        <IonCard
          hidden={!authData}
          className="br-16 no-shadow ion-p-8"
          style={{ position: "sticky" }}
          onClick={() => {
            history.push("/account");
          }}
        >
          <IonGrid>
            <IonRow>
              <IonCol size="2" className="ion-p-8">
                <IonAvatar style={{ width: "100%", height: "auto" }}>
                  <img
                    src={
                      (authData && authData.photo) ||
                      "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
                    }
                  />
                </IonAvatar>
              </IonCol>
              <IonCol className="ion-p-8" size="6">
                <IonText>
                  <h5 className="ion-no-margin">
                    {(authData &&
                      authData.first_name &&
                      authData.first_name.substring(0, 10)) ||
                      ""}
                    {authData &&
                    authData.first_name &&
                    authData.first_name.length > 10
                      ? "..."
                      : ""}
                  </h5>
                </IonText>
                <IonText color="medium">
                  <h6 className="ion-no-margin">
                    {(authData && authData.contact_no) || "-"}
                  </h6>
                </IonText>
              </IonCol>
              <IonCol className="ion-text-right">
                <IonText color="success" style={{ fontSize: "36px" }}>
                  {(authData && authData.uid) || ""}
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
        <IonCard className="br-16 no-shadow">
          <IonSearchbar
            className="bg-white"
            mode="ios"
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value!)}
          ></IonSearchbar>
        </IonCard>
      </IonHeader>
      <IonContent className="bg-gray ion-padding-start ion-padding-end">
        <Lottie animationData={Welcome} play={true}></Lottie>
        <GroupList authData={authData}></GroupList>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state, OwnProps) => ({
    authData: state.user.authData,
  }),
  mapDispatchToProps: {},
  component: withRouter(Portal),
});
