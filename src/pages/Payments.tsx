import {
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
  RefresherEventDetail
} from "@ionic/react";
import { chevronDownCircleOutline, close } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { RouteComponentProps, useParams,useLocation } from "react-router";
import GeneralSkeleton from "../components/Shared/GeneralSkeleton";
import { connect } from "../data/connect";
import { PostPayments } from "../data/quiz/quiz.actions";
import PaymentsAnimation from "../lotties/payments.json";
import { AuthData } from "../models/Base";
import { PaymentsHistory } from "../models/Quiz";
import { Rupiah } from "../util/helper";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  authData: AuthData;
  payments: PaymentsHistory[];
}

interface DispatchProps {
  PostPayments: typeof PostPayments;
}
interface PaymentsProps extends OwnProps, StateProps, DispatchProps {}

const Payments: React.FC<PaymentsProps> = ({ history, authData,PostPayments,payments}) => {
  // const [Payments, setPayments] = useState<any>(undefined);
  const [showModal, setShowModal] = useState(false);
  const [SelectedPayment, setSelectedPayment] = useState<PaymentsHistory>();

  useEffect(()=>{    
    if(authData===null) history.replace('/login')
    if(authData && Payments!=undefined){
      PostPayments()
    }
  },[authData]);
  const DetailPayment = (data: PaymentsHistory) => {    
    setShowModal(true);
    setSelectedPayment(data);
  };
  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await PostPayments()
    event.detail.complete();
  }
  if (!payments) return (
    <>
      <IonPage>
        <GeneralSkeleton></GeneralSkeleton>
      </IonPage>
    </>
  );
  if (payments && payments.length<1)return (
    <IonPage>
      <IonToolbar>
        <div slot="start"><img
          src="/assets/img/brand/icon adzkia black.jpg"
          width="36px"
          style={{
            marginTop:"8px",
            marginLeft:"8px"
          }}
        /></div>
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
  return (
    <IonPage id="session-detail-page ">
      <IonToolbar>
        <div slot="start"><img
          src="/assets/img/brand/icon adzkia black.jpg"
          width="36px"
          style={{
            marginTop:"8px",
            marginLeft:"8px"
          }}
        /></div>
        <IonTitle>Histori Pembayaran</IonTitle>
      </IonToolbar>
      <IonContent className="bg-gray">
        {payments.map((item: PaymentsHistory, index: number) => (
          <IonCard key={index}>
            <IonCardContent>
              <IonRow onClick={() => DetailPayment(item)}>
                <IonCol> 
                <h6 className="ion-no-margin"><b>Nama Group : {item.paket.group_name}</b></h6>
                <h6 className="ion-no-margin">{item.trxdate}</h6>
                <h6 className="ion-no-margin">Rp {item.paket.price}</h6>
                  </IonCol>
              </IonRow>
              <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
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
                    hidden={SelectedPayment && SelectedPayment.paid_date?true:false}
                    expand="block"
                    onClick={() => {
                      if (SelectedPayment) setShowModal(false);
                      history.push("/group/purchase/" + SelectedPayment?.gid +'/'+SelectedPayment?.pid);
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
  }

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    authData: state.base.authData,
    payments: state.quiz.payments
  }),
  mapDispatchToProps: {
    PostPayments
  },
  component: Payments,
});
