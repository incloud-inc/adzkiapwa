import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  useIonViewWillLeave
} from "@ionic/react";
import { star } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, useParams } from "react-router";
import GeneralSkeleton from "../../components/Shared/GeneralSkeleton";
import { connect } from "../../data/connect";
import { PostPurchase } from "../../data/quiz/quiz.actions";
import { QuizState } from "../../data/quiz/quiz.state";
import { AuthData } from "../../models/Base";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  quiz: QuizState;
  authData:AuthData;
}

interface DispatchProps {
  PostPurchase:typeof PostPurchase;
}
interface GroupPurchaseProps extends OwnProps, StateProps, DispatchProps {}
interface PurchaseParam{
  gid?:string
  pid?:string
}
const GroupPurchase: React.FC<GroupPurchaseProps> = ({ history, authData,quiz,PostPurchase }) => {
  const [Submitted,setSubmitted]= useState(false);
  let param: PurchaseParam = useParams();
  useEffect(() => {
    if(authData===null) history.push("/login")
    // if(!Submitted && !quiz.PaymentDetail && !quiz.TrxGopay){
    //   setSubmitted(true)
    //   PostPurchase(param.gid||"0",param.pid||"0")
    // }
  },[authData]);
  useEffect(()=>{
    PostPurchase(param.gid||"0",param.pid||"0")
  },[])

  useIonViewDidEnter(()=>{
    if(!Submitted){
      setSubmitted(true)
    }
  })
  useIonViewWillLeave(()=>{
    setSubmitted(false)
  })

  useEffect(() => {
    if(quiz.PaymentDetail || quiz.TrxGopay) setSubmitted(false)

  },[quiz]);
  if (quiz.PaymentDetail||quiz.TrxGopay) {

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
            className="br-16 ion-margin no-shadow"
            style={{ zIndex: "-1" }}
          >
            <IonGrid className="ion-no-padding">
              <IonRow
                className="ion-padding ion-text-center"
                hidden={!quiz.PaymentDetail && !quiz.TrxGopay}
              >
                <IonCol>
                  <h5>{quiz.PaymentDetail?.group?.group_name||quiz.TrxGopay?.group?.group_name||''}</h5>
                </IonCol>
              </IonRow>
              <IonRow
                className="ion-padding ion-text-center"
                hidden={!quiz.PaymentDetail?.group?.description&&!quiz.TrxGopay?.group?.description}
              >
                <IonCol>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: quiz.PaymentDetail?.group?.description||quiz.TrxGopay?.group?.description||'',
                    }}
                  ></div>
                </IonCol>
                <IonCol size="12" class="ion-text-center">
                  <img
                    src="/assets/img/brand/icon adzkia black.jpg"
                    width="48px"
                    style={{
                      position: "absolute",
                      right: "0px",
                      left: "0px",
                      top: "96px",
                      margin: "0 auto",
                    }}
                  />
                  <img
                    src={quiz.PaymentDetail?.group?.qr_code||quiz.TrxGopay?.message?.actions[0]?.url || ""}
                    width="auto"
                    height="240px"
                  />
                  <IonButton class="ion-margin-top" href={quiz.PaymentDetail?.group?.qr_code||quiz.TrxGopay?.message?.actions[0]?.url || ""} download="qris">
                    Download QRIS
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow
                class="ion-align-items-center ion-padding"
                style={{ background: "#E2E2F0" }}
              >
                {" "}
                <IonCol size="6">
                  <h6 className="ion-no-margin color-navy">
                    <b>Total</b>
                  </h6>
                </IonCol>
                <IonCol size="6" className="ion-text-right">
                <h5 className="ion-no-margin color-navy" hidden={!quiz.PaymentDetail}>
                    <b>
                      {quiz.PaymentDetail?.group?.price!=="0"
                      ? "Rp " + quiz.PaymentDetail?.group?.price
                      : "GRATIS"
                      }
                    </b>
                  </h5>
                  <h5 className="ion-no-margin color-navy" hidden={!quiz.TrxGopay}>
                    <b>
                      {quiz.TrxGopay?.group?.price !== "0"
                      ? "Rp " + quiz.TrxGopay?.group?.price
                      : "GRATIS"
                      }
                    </b>
                  </h5>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
        </IonContent>
        <IonFooter class="bg-white">
          <IonButton
            expand="block"
            className="ion-margin"
            size="large"
            style={{ "--border-radius": "40px" }}
            onClick={() => {
              history.push(`/group/purchasecomplete/${param.pid!=="0"?param.pid: quiz.TrxGopay?.pid ||"0"}`);
            }}
          >
            SAYA SUDAH BAYAR
          </IonButton>
        </IonFooter>
      </IonPage>
    );
  } else if (!quiz.PaymentDetail&&!quiz.TrxGopay) {
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
    quiz: state.quiz,
  }),
  mapDispatchToProps: {
    PostPurchase,
  },
  component: GroupPurchase,
});