import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";
import { chevronDownCircleOutline, close, remove, star } from "ionicons/icons";
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
  const [showModal, setShowModal] = useState(false);
  const [SelectedPayment, setSelectedPayment] = useState<any>(undefined);

  //   const param<any> = useParams();
  let param: any = useParams();
  const getPayments = () => {
    setPayments(undefined);
    const BodyData = new FormData();
    if (authData) {
      BodyData.append("token", authData && authData.token);
    }
    BodyData.append("gid", param.id || "");
    fetch("https://api.adzkia.id/payment/history", {
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
        if (res.histories && res.histories.length > 0) {
          setPayments(res.histories);
        } else {
          setPayments(null);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  useIonViewDidEnter(() => {
    getPayments();
  });
  const DetailPayment = (data: any) => {
    setShowModal(true);
    setSelectedPayment(data);
  };
  if (Payments) {
    return (
      <IonPage id="session-detail-page ">
        <IonToolbar>
          <IonTitle>Histori Pembayaran</IonTitle>
        </IonToolbar>
        <IonContent className="bg-gray">
          {Payments.map((item: any, index: any) => (
            <IonCard key={index}>
              <IonCardContent>
                <IonRow onClick={() => DetailPayment(item)}>
                  <IonCol> {item.trxdate}</IonCol>
                  <IonCol> {item.paket.group_name}</IonCol>
                  <IonCol> {item.paket.price}</IonCol>
                </IonRow>
                <IonRefresher slot="fixed" onIonRefresh={getPayments}>
                  <IonRefresherContent
                    pullingIcon={chevronDownCircleOutline}
                    pullingText="Pull to refresh"
                    refreshingSpinner="circles"
                  ></IonRefresherContent>
                </IonRefresher>
                <IonModal isOpen={showModal}>
                  <IonHeader>
                    <IonToolbar>
                      <IonTitle slot="start">Detail Pembayaran</IonTitle>
                      <IonButtons slot="end">
                        <IonButton onClick={() => setShowModal(false)}>
                          <IonIcon icon={close}></IonIcon>
                        </IonButton>
                      </IonButtons>
                    </IonToolbar>
                  </IonHeader>
                  <IonContent className="ion-padding">
                    <IonGrid>
                      <IonRow
                        style={{ borderBottom: "1px solid lightgray" }}
                        class="ion-margin-bottom ion-padding-bottom"
                      >
                        <IonCol size="12">ID Transaksi</IonCol>
                        <IonCol size="12">
                          {SelectedPayment
                            ? SelectedPayment.transaction_id || ""
                            : ""}
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol size="6">Nama Paket</IonCol>
                        <IonCol size="6" className="ion-text-right">
                          {SelectedPayment
                            ? SelectedPayment.paket.group_name || ""
                            : ""}
                        </IonCol>
                        <IonCol size="6">Harga</IonCol>
                        <IonCol size="6" className="ion-text-right">
                          {SelectedPayment ? SelectedPayment.amount || "" : ""}
                        </IonCol>
                        <IonCol size="6">Metode Pembayaran</IonCol>
                        <IonCol size="6" className="ion-text-right">
                          {SelectedPayment
                            ? SelectedPayment.payment_gateway ||
                              "tidak diketahui "
                            : ""}
                        </IonCol>
                        <IonCol size="6">Tanggal Transaksi</IonCol>
                        <IonCol size="6" className="ion-text-right">
                          {SelectedPayment ? SelectedPayment.trxdate || "" : ""}
                        </IonCol>
                        <IonCol size="6">Tanggal Pembayaran</IonCol>
                        <IonCol size="6" className="ion-text-right">
                          {SelectedPayment
                            ? SelectedPayment.paid_date || "belum dibayar "
                            : ""}
                        </IonCol>
                        <IonCol size="6">Status Pembayaran</IonCol>
                        <IonCol size="6" className="ion-text-right">
                          {SelectedPayment
                            ? SelectedPayment.payment_status ||
                              "tidak diketahui "
                            : ""}
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                    <IonButton
                      hidden={SelectedPayment && SelectedPayment.paid_date}
                      expand="block"
                      onClick={() => {
                        if (SelectedPayment) setShowModal(false);
                        history.push("/group/purchase/" + SelectedPayment.gid);
                      }}
                    >
                      Bayar
                    </IonButton>
                  </IonContent>
                </IonModal>
              </IonCardContent>
            </IonCard>
          ))}
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
          <div className="ion-text-center ion-padding">
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
