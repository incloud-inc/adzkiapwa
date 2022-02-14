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
import PaymentsAnimation from "../lotties/payments.json";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  authData: any;
}

interface DispatchProps {}
interface PaymentsProps extends OwnProps, StateProps, DispatchProps {}

const Payments: React.FC<PaymentsProps> = ({ history, authData }) => {
  const [Payments, setPayments] = useState<any>(undefined);
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
          setPayments(res.result);
        } else {
          setPayments(null);
        }
      })
      .catch((err) => {
        alert(err);
      });
  });
  if (Payments) {
    return (
      <IonPage id="session-detail-page ">
        <IonToolbar>
          {/* <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/portal"></IonBackButton>
          </IonButtons> */}
          <IonTitle>Histori Pembayaran</IonTitle>
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
                    <b>{Payments.group_name || ""}</b>
                  </h5>
                </IonCol>
                <IonCol size="4" className="ion-text-right">
                  <h5 className="ion-no-margin color-navy">
                    <b>
                      {Payments.price !== "0"
                        ? "Rp " + Payments.price
                        : "GRATIS"}
                    </b>
                  </h5>
                </IonCol>
              </IonRow>
              <IonRow
                className="ion-padding-top ion-padding-bottom"
                hidden={!Payments.description}
              >
                <IonCol>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: Payments.description || "",
                    }}
                  ></div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
          <div className="ion-margin">
            <IonText color="medium">
              <b>Histori Pembayaran</b>
            </IonText>
          </div>
        </IonContent>
      </IonPage>
    );
  } else if (Payments === null) {
    return (
      <IonPage>
        <IonToolbar>
          {/* <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/portal"></IonBackButton>
          </IonButtons> */}
          <IonTitle>Histori Pembayaran</IonTitle>
        </IonToolbar>
        <IonContent className="bg-gray">
          <div className="ion-text-center">
            <Lottie animationData={PaymentsAnimation} play={true}></Lottie>
          </div>
          {[...Array(10)].map((item, index) => (
            <IonCard>
              <IonCardContent>
                <IonRow>
                  <IonCol> {(index + 1) * 2} Feb 22</IonCol>
                  <IonCol> Paket Tryout {index + 1}</IonCol>
                  <IonCol> Rp {index + 3}0.000</IonCol>
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
  component: Payments,
});
