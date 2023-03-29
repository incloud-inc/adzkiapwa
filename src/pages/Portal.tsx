import {
  IonAvatar, IonButton, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonSearchbar, IonText
} from "@ionic/react";
import React, { useState } from "react";
import Lottie from "react-lottie-player";
import { RouteComponentProps, withRouter } from "react-router";
import GroupListComponent from "../components/Group/GroupList";
import { BaseState } from "../data/base/base.state";
import { connect } from "../data/connect";
import Welcome from "../lotties/sma.json";
import "./SessionDetail.scss";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  base: BaseState;
}

interface DispatchProps {}

type PortalProps = OwnProps & StateProps & DispatchProps;

const Portal: React.FC<PortalProps> = ({
  history,
  base,
}) => {
  const [searchText, setSearchText] = useState("");
  
  return (
    <IonPage id="session-detail-page ">
      <IonHeader className="bg-gray no-shadow ion-padding-start ion-padding-end ion-padding-top">
        <IonCard
          hidden={base?.authData?true:false}
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
          hidden={!base?.authData}
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
                      base?.authData?.photo ||
                      "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
                    }
                  />
                </IonAvatar>
              </IonCol>
              <IonCol className="ion-p-8" size="6">
                <IonText>
                  <h5 className="ion-no-margin">
                    {(base?.authData?.first_name.substring(0, 10)) || ""}
                    {base?.authData?.first_name && base?.authData?.first_name.length > 10
                      ? "..."
                      : ""}
                  </h5>
                </IonText>
                <IonText color="medium">
                  <h6 className="ion-no-margin">
                    {(base?.authData?.email) || "-"}
                  </h6>
                </IonText>
              </IonCol>
              <IonCol className="ion-text-right">
                <IonText color="success" style={{ fontSize: "36px" }}>
                  {(base?.authData?.uid) || ""}
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
        <GroupListComponent authData={base?.authData}></GroupListComponent>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    base: state.base,
  }),
  mapDispatchToProps: {},
  component: withRouter(Portal),
});
