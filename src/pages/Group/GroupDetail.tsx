import {
  IonBackButton,
  IonBadge,
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
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";
import { star } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, useParams, withRouter } from "react-router";
import { BaseUrl } from "../../AppConfig";
import LessonList from "../../components/Group/LessonList";
import QuizList from "../../components/Group/QuizList";
import GeneralSkeleton from "../../components/Shared/GeneralSkeleton";
import { connect } from "../../data/connect";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  authData: any;
}

interface DispatchProps {}
interface GroupDetailProps extends OwnProps, StateProps, DispatchProps {}

const GroupDetail: React.FC<GroupDetailProps> = ({ history, authData }) => {
  const [GroupDetail, setGroupDetail] = useState<any>(undefined);
  //   const param<any> = useParams();
  let param: any = useParams();
  useEffect(() => {
    if (authData !== undefined) {
      const BodyData = new FormData();
      if (authData) {
        BodyData.append("token", authData && authData.token);
      }
      BodyData.append("gid", param.id || "");
      fetch(
        authData
          ? BaseUrl+"group/detail"
          : BaseUrl+"grouppublic/detail",
        {
          method: "POST",
          body: BodyData,
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Server Bermasalah");
          }
          return res.json();
        })
        .then((res) => {
          if (res.result && res.result.gid) {
            setGroupDetail(res.result);
            if (res.result.price !== "0") {
              history.replace("/group/purchase/" + res.result.gid);
            }
          } else {
            setGroupDetail(null);
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [authData]);
  if (GroupDetail) {
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
                    <b>{GroupDetail.group_name || ""}</b>
                  </h5>
                </IonCol>
                <IonCol size="4" className="ion-text-right">
                  <h5 className="ion-no-margin color-navy">
                    <b>
                      {GroupDetail.price !== "0"
                        ? "Rp " + GroupDetail.price
                        : "GRATIS"}
                    </b>
                  </h5>
                </IonCol>
              </IonRow>
              <IonRow
                className="ion-padding-top ion-padding-bottom"
                hidden={!GroupDetail.description}
              >
                <IonCol>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: GroupDetail.description || "",
                    }}
                  ></div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
          <div className="ion-margin">
            <IonText color="medium">
              <b>Materi Pembelajaran</b>
            </IonText>
          </div>
          <LessonList gids={param.id}></LessonList>
          <div className="ion-margin">
            <IonText color="medium">
              <b>Quiz</b>
            </IonText>
          </div>
          <QuizList gids={param.id}></QuizList>
        </IonContent>
      </IonPage>
    );
  } else if (GroupDetail === null) {
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
  component: GroupDetail,
});
