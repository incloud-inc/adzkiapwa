import {
  IonBadge,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonText,
} from "@ionic/react";
import { star } from "ionicons/icons";
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
interface QuizListProps
  extends OwnProps,
    StateProps,
    DispatchProps,
    RouteComponentProps {}
const QuizList: React.FC<QuizListProps> = ({ history, gids, authData }) => {
  const [QuizList, setQuizList] = useState<any>(undefined);
  useEffect(() => {
    if (QuizList !== undefined) {
      return;
    }
    const BodyData = new FormData();
    BodyData.append("token", authData.token || "");
    fetch("https://api3.adzkia.id/quiz/list", {
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
        if (
          res.result &&
          res.result.filter((item: any) => item.gids === gids).length > 0
        ) {
          setQuizList(res.result);
        } else {
          setQuizList(null);
        }
      })
      .catch((err) => {
        // alert(err);
        setQuizList(null);
      });
  }, [QuizList]);
  if (QuizList) {
    return (
      <IonList lines="full">
        {QuizList.map((item: any, index: React.Key | undefined) => (
          <IonItem
            key={index}
            onClick={() => history.push("/quiz/start/" + item.quid || "")}
          >
            <IonBadge color="primary" className="ion-p-8 br-8" slot="start">
              <IonIcon icon={star} color="light"></IonIcon>
            </IonBadge>
            <IonLabel>{item.quiz_name || ""}</IonLabel>
          </IonItem>
        ))}
      </IonList>
    );
  } else if (QuizList === null) {
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
  component: withRouter(QuizList),
});