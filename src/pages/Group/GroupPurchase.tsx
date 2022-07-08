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
} from "@ionic/react";
import { star } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, useParams, withRouter } from "react-router";
import LessonList from "../../components/Group/LessonList";
import QuizList from "../../components/Group/QuizList";
import GeneralSkeleton from "../../components/Shared/GeneralSkeleton";
import { connect } from "../../data/connect";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  authData: any;
}

interface DispatchProps {}
interface GroupPurchaseProps extends OwnProps, StateProps, DispatchProps {}

const GroupPurchase: React.FC<GroupPurchaseProps> = ({ history, authData }) => {
  const [GroupPurchase, setGroupPurchase] = useState<any>(undefined);
  //   const param<any> = useParams();
  let param: any = useParams();
  useEffect(() => {
    if (authData) {
      const BodyData = new FormData();
      BodyData.append("token", authData && authData.token);
      BodyData.append("gid", param.id || "");
      BodyData.append(
        "callbackapp",
        param.id
          ? "http://localhost:8100/group/purchase/" + param.id
          : "http://localhost:8100/"
      );
      fetch("https://api3.adzkia.id/payment/createtransactiongopay", {
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
            setGroupPurchase(res);
          } else {
            setGroupPurchase(null);
            alert(res.message || "Pembaayran belum bisa dilakukan");
            history.replace("/tabs/portal");
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [authData]);
  if (GroupPurchase) {
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
                hidden={!GroupPurchase.group.group_name}
              >
                <IonCol>
                  <h5>{GroupPurchase.group.group_name || ""}</h5>
                </IonCol>
              </IonRow>
              <IonRow
                className="ion-padding ion-text-center"
                hidden={!GroupPurchase.group.description}
              >
                <IonCol>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: GroupPurchase.group.description || "",
                    }}
                  ></div>
                </IonCol>
                <IonCol size="12" class="ion-text-center">
                  <img
                    src="/assets/img/brand/icon adzkia.png"
                    width="48px"
                    style={{
                      position: "absolute",
                      right: "0px",
                      left: "0px",
                      top: "96px",
                      margin: "0 auto",
                      border: "4px solid white",
                      borderRadius: "50%",
                    }}
                  />
                  <img
                    src={GroupPurchase.message.actions[0].url || ""}
                    width="auto"
                    height="240px"
                  />
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
                  <h5 className="ion-no-margin color-navy">
                    <b>
                      {GroupPurchase.group.price !== "0"
                        ? "Rp " + GroupPurchase.group.price
                        : "GRATIS"}
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
              history.push("/group/purchasecomplete/" + GroupPurchase.pid);
            }}
          >
            Cek status pembayaran
          </IonButton>
        </IonFooter>
      </IonPage>
    );
  } else if (GroupPurchase === null) {
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
    authData: state.user.authData,
  }),
  // mapDispatchToProps: {
  //   setAuthData,
  // },
  component: GroupPurchase,
});
