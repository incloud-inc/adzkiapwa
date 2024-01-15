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
  IonRouterLink,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  useIonViewWillLeave
} from "@ionic/react";
import { documentOutline } from "ionicons/icons";
import React, { useEffect } from "react";
import { RouteComponentProps, useLocation, useParams, withRouter } from "react-router";
import LessonListComponent from "../../components/Group/LessonList";
import QuizList from "../../components/Group/QuizList";
import GeneralSkeleton from "../../components/Shared/GeneralSkeleton";
import { connect } from "../../data/connect";
import { PostGroupDetail } from "../../data/quiz/quiz.actions";
import { AuthData } from "../../models/Base";
import { GroupDetail, LessonList } from "../../models/Quiz";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  authData: AuthData;
  GroupDetail:GroupDetail;
  LessonList:LessonList[];
}

interface DispatchProps {
  PostGroupDetail:typeof PostGroupDetail;
}
interface GroupDetailProps extends OwnProps, StateProps, DispatchProps {}

const Detail: React.FC<GroupDetailProps> = ({ history,LessonList, authData,GroupDetail,PostGroupDetail }) => {
  const location = useLocation();
  let param: any = useParams();
  useIonViewWillEnter(()=>{    
      PostGroupDetail(param.id);
  })
  useIonViewWillLeave(()=>{
    PostGroupDetail(undefined);
  })
  useEffect(() => {    
    if(GroupDetail){
      if(GroupDetail?.price!=="0" && GroupDetail.payment_id!=="settlement"){
        history.replace("/group/purchase/" + GroupDetail?.gid + "/" + GroupDetail?.payment_id)
      }
    }
  },[GroupDetail]);
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
                  <IonBadge color="primary" className="br-8">
                  <IonIcon icon={documentOutline} size="large" color="light"></IonIcon>
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
          <div className="ion-margin" hidden={LessonList?.length==0}>
            <IonText color="medium">
              <b>Materi Pembelajaran</b>
            </IonText>
          </div>
          <LessonListComponent gids={param.id}></LessonListComponent>
          <div className="ion-margin">
            <IonText color="medium">
              <b>Quiz</b>
            </IonText>
          </div>
          <IonRouterLink routerLink="/quiz/attempt">
          <QuizList gids={param.id}></QuizList>
          </IonRouterLink>
         
        </IonContent>
      </IonPage>
    );
  } 
  if (GroupDetail === null) {
    return (
      <IonPage>
        <div className="ion-text-center">
          <IonText>Data Tidak ditemukan</IonText>
        </div>
      </IonPage>
    );
  }
  return (
    <>
      <IonPage>
        <GeneralSkeleton></GeneralSkeleton>
      </IonPage>
    </>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    authData: state.base.authData,
    GroupDetail: state.quiz.GroupDetail,
    LessonList: state.quiz.LessonList
  }),
  mapDispatchToProps: {
    PostGroupDetail,
  },
  component: withRouter(Detail),
});
