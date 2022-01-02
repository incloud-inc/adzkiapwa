import {
  IonBackButton,
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
  IonToolbar,
} from "@ionic/react";
import Item from "antd/lib/list/Item";
import { book, close, download, newspaper, star } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "../../data/connect";
import GeneralSkeleton from "../Shared/GeneralSkeleton";
interface OwnProps {
  gids: string;
}

interface StateProps {
  authData: any;
}

interface DispatchProps {}

interface LessonListProps
  extends OwnProps,
    StateProps,
    DispatchProps,
    RouteComponentProps {}
const LessonList: React.FC<LessonListProps> = ({ history, gids, authData }) => {
  const [LessonList, setLessonList] = useState<any>(undefined);
  const [LessonDetail, setLessonDetail] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (LessonList !== undefined) {
      return;
    }
    const BodyData = new FormData();
    if (authData) {
      BodyData.append("token", authData && authData.token);
    }
    fetch(
      authData
        ? "https://api3.adzkia.id/lesson/list"
        : "https://api3.adzkia.id/lessonpublic/list",
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
        if (
          res.result &&
          res.result.filter((item: any) => item.gids === gids).length > 0
        ) {
          setLessonList(res.result);
        } else {
          setLessonList(null);
        }
      })
      .catch((err) => {
        alert(err);
        setLessonList(null);
      });
  }, [LessonList]);
  if (LessonList) {
    return (
      <>
        <IonList lines="full">
          {LessonList.map((item: any, index: React.Key | undefined) => (
            <IonItem
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
                      __html: LessonDetail && LessonDetail.study_description,
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
    authData: state.user.authData,
  }),
  mapDispatchToProps: {},
  component: withRouter(LessonList),
});
