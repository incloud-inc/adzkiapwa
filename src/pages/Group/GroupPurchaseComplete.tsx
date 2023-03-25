import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { star } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router";
import { BaseUrl } from "../../AppConfig";
import GeneralSkeleton from "../../components/Shared/GeneralSkeleton";
import { connect } from "../../data/connect";
import { AuthData } from "../../models/Base";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  authData: AuthData;
}

interface DispatchProps {}
interface GroupPurchaseCompleteProps
  extends OwnProps,
    StateProps,
    DispatchProps {}

const GroupPurchaseComplete: React.FC<GroupPurchaseCompleteProps> = ({
  history,
  authData,
}) => {
  const [GroupPurchaseComplete, setGroupPurchaseComplete] =
    useState<any>(undefined);
  //   const param<any> = useParams();
  let param: any = useParams();
  useEffect(() => {
    if (authData) {
      const BodyData = new FormData();
      BodyData.append("token", authData && authData.token);
      BodyData.append("pid", param.id || "");
      fetch(BaseUrl+"payment/checkstatuspayment", {
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
          if (res.status) {
            setGroupPurchaseComplete(res);
          } else {
            setGroupPurchaseComplete(null);
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [authData]);
  if (GroupPurchaseComplete) {
    return (
      <IonPage id="session-detail-page ">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/portal"></IonBackButton>
          </IonButtons>
          <IonTitle>Beli Paket</IonTitle>
        </IonToolbar>
        <IonContent className="bg-gray">
          <div
            className="ion-text-center"
            style={{ marginTop: "24px", marginBottom: "-40px" }}
          >
            <IonBadge color="primary" className="ion-p-8 br-8">
              <IonIcon icon={star} color="light" size="large"></IonIcon>
            </IonBadge>
          </div>
          <IonCard
            className="br-16 ion-p-8 ion-margin no-shadow"
            style={{ zIndex: "-1" }}
          >
            <IonGrid>
              <IonRow class="ion-align-items-center">
                {" "}
                <IonCol size="6">
                  <h6 className="ion-no-margin color-navy">
                    <b>Total</b>
                  </h6>
                </IonCol>
                <IonCol size="6" className="ion-text-right">
                  <h5 className="ion-no-margin color-navy">
                    <b>
                    {GroupPurchaseComplete.group.price !== "0"
                        ? "Rp " + GroupPurchaseComplete.payment.amount : "GRATIS"}
                        </b>
                  </h5>
                </IonCol>
                <IonCol size="6">
                  <h6 className="ion-no-margin color-navy">
                    <b>Status</b>
                  </h6>
                </IonCol>
                <IonCol size="6" className="ion-text-right">
                  <h5 className="ion-no-margin color-navy">
                  <b>{GroupPurchaseComplete.payment.payment_status}</b>
                  </h5>
                </IonCol>
              </IonRow>
              <IonRow
                className="ion-padding-top ion-padding-bottom"
                hidden={!GroupPurchaseComplete.description}
              >
                <IonCol>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: GroupPurchaseComplete.description || "",
                    }}
                  ></div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
          <IonButton
            expand="block"
            className="ion-margin"
            size="large"
            hidden={GroupPurchaseComplete.payment.payment_status!=='pending'}
            onClick={() => history.goBack()}
          >
            Bayar
          </IonButton>
          <IonButton
            expand="block"
            className="ion-margin"
            size="large"
            color="success"
            onClick={() => history.replace("/group/detail/"+GroupPurchaseComplete.group.gid)}
            hidden={GroupPurchaseComplete.payment.payment_status!=='settlement'}
          >
            Kerjakan Quiz
          </IonButton>
        </IonContent>
      </IonPage>
    );
  } else if (GroupPurchaseComplete === null) {
    return (
      <IonPage>
        <div className="ion-text-center">
          <IonText>Data Tidak ditemukan</IonText>
        </div>
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
    authData: state.base.authData,
  }),
  // mapDispatchToProps: {
  //   setAuthData,
  // },
  component: GroupPurchaseComplete,
});
