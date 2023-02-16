import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import { book, close, newspaper, star } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, useLocation, withRouter } from "react-router";
import { connect } from "../../data/connect";
import { PostLessonList } from "../../data/quiz/quiz.actions";
import { AuthData } from "../../models/Base";
import { LessonList } from "../../models/Quiz";
import GeneralSkeleton from "../Shared/GeneralSkeleton";
interface OwnProps {
  gids: string;
}

interface StateProps {
  authData: AuthData;
  LessonList: LessonList[]
}

interface DispatchProps {
  PostLessonList:typeof PostLessonList
}

interface LessonListProps
  extends OwnProps,
    StateProps,
    DispatchProps,
    RouteComponentProps {}
const LessonListComponent: React.FC<LessonListProps> = ({ history, gids, authData,LessonList,PostLessonList }) => {
  const [LessonDetail, setLessonDetail] = useState<LessonList>();
  const [showModal, setShowModal] = useState(false);
  // const location = useLocation();
  // useEffect(()=>{
  //   if(authData===null) history.push("/login")
  //   let fired = false
  //   if(authData){
  //     if(location.pathname.includes("/group/detail")&&authData){
  //       PostLessonList(gids);
  //       fired = true;
  //     }
  //     if(authData&&!fired){
  //       PostLessonList(gids);
  //     }
  //   }   
  // },[authData])
  useEffect(()=>{
    PostLessonList(gids);
  },[])
  if (LessonList) {
    return (
      <>
        <IonList lines="none" className="bg-transparent">
          {LessonList.map((item: LessonList, index: React.Key | undefined) => (
            <IonItem
            className="bg-transparent"
              key={index}
              onClick={() => {
                setLessonDetail(item);
                setShowModal(true);
              }}
            >
              <IonBadge color="primary" className="ion-p-8 br-8" slot="start">
                <IonIcon icon={star} color="light"></IonIcon>
              </IonBadge>
              <IonLabel>{item.title}</IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonModal isOpen={showModal}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowModal(false)}>
                  <IonIcon icon={close}></IonIcon>
                </IonButton>
              </IonButtons>
              <IonTitle>Materi</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonGrid className="ion-padding">
              <IonRow>
                <IonCol size="2">
                  <IonBadge color="primary" className="ion-p-8 br-8">
                    <IonIcon icon={book} size="large" color="light"></IonIcon>
                  </IonBadge>
                </IonCol>
                <IonCol>
                  <h5 className="ion-no-margin">
                    <b>{(LessonDetail && LessonDetail.title) || ""}</b>{" "}
                  </h5>
                  <h6 className="ion-no-margin">
                    Topic :{" "}
                    <b>{(LessonDetail && LessonDetail.category_name) || ""}</b>{" "}
                  </h6>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: LessonDetail && LessonDetail.study_description||'',
                    }}
                  ></div>
                  <IonButton
                    onClick={() => {
                      window.open(
                        `https://adzkia.id/upload/${
                          (LessonDetail && LessonDetail.attachment) || ""
                        }`,
                        "_blank"
                      );
                    }}
                    hidden={
                      LessonDetail &&
                      LessonDetail.attachment &&
                      LessonDetail.attachment !== null
                        ? false
                        : true
                    }
                  >
                    <IonIcon icon={newspaper} slot="start"></IonIcon> Unduh
                    Lampiran
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal>
      </>
    );
  } else if (LessonList === null) {
    return (
      <div className="ion-text-center">
        <IonText>Data Tidak ditemukan</IonText>
      </div>
    );
  } else {
    return <GeneralSkeleton></GeneralSkeleton>;
  }
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    authData: state.base.authData,
    LessonList: state.quiz.LessonList
  }),
  mapDispatchToProps: {PostLessonList},
  component: withRouter(LessonListComponent),
});
