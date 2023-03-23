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
  useIonViewWillEnter,
  useIonViewWillLeave
} from "@ionic/react";
import { star } from "ionicons/icons";
import React, { useEffect } from "react";
import { RouteComponentProps, useLocation, useParams, withRouter } from "react-router";
import LessonList from "../../components/Group/LessonList";
import QuizList from "../../components/Group/QuizList";
import GeneralSkeleton from "../../components/Shared/GeneralSkeleton";
import { connect } from "../../data/connect";
import { PostGroupDetail } from "../../data/quiz/quiz.actions";
import { AuthData } from "../../models/Base";
import { GroupDetail } from "../../models/Quiz";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  authData: AuthData;
  GroupDetail:GroupDetail
}

interface DispatchProps {
  PostGroupDetail:typeof PostGroupDetail;
}
interface GroupDetailProps extends OwnProps, StateProps, DispatchProps {}

const Detail: React.FC<GroupDetailProps> = ({ history, authData,GroupDetail,PostGroupDetail }) => {
  const location = useLocation();
  let param: any = useParams();
  useEffect(()=>{
    PostGroupDetail(param.id||"0");

    // if(authData===null) history.push("/login")
    // let fired = false
    // if(authData){
      // if(location.pathname.includes("/group/detail")){
      //   fired = true;

      //   PostGroupDetail(param.id||"0");
      // }
      // if(!fired){
      //   PostGroupDetail(param.id||"0");
      // }
    // }   
  },[])
  useIonViewWillLeave(()=>{
    PostGroupDetail(undefined);
  })
  useEffect(() => {
    // console.log(GroupDetail?.price == "0")
    if(GroupDetail){
      if(GroupDetail?.price!="0"){
        history.replace("/group/purchase/" + GroupDetail?.gid + "/" + GroupDetail?.payment_id)
      }
    }
    // if (history.location.pathname.includes("/group/detail")) {
    //   setTimeout(() => {
    //     if(GroupDetail?.price!="0"){
    //       history.replace("/group/purchase/" + GroupDetail?.gid + "/" + GroupDetail?.payment_id)
    //     }
    //   }, 3000);
    // }

    // else if(GroupDetail?.price!=="0" && GroupDetail?.payment_id == null){
    //   history.replace("/group/purchase/" + GroupDetail?.gid + "/0")
    // }
    // if(){
    //   
    // }
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
    GroupDetail: state.quiz.GroupDetail
  }),
  mapDispatchToProps: {
    PostGroupDetail,
  },
  component: withRouter(Detail),
});
