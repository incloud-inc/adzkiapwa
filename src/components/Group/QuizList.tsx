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
import { RouteComponentProps, useLocation, withRouter } from "react-router";
import { connect } from "../../data/connect";
import { PostQuizAttempt, PostQuizList } from "../../data/quiz/quiz.actions";
import { AuthData } from "../../models/Base";
import { QuizAttempt, QuizList } from "../../models/Quiz";
import GeneralSkeleton from "../Shared/GeneralSkeleton";
interface OwnProps {
  gids: string;
}

interface StateProps {
  authData: AuthData;
  QuizList: QuizList[];
  QuizAttempt:QuizAttempt;
}

interface DispatchProps {
  PostQuizList:typeof PostQuizList;
  PostQuizAttempt:typeof PostQuizAttempt;
}
interface QuizListProps
  extends OwnProps,
    StateProps,
    DispatchProps,
    RouteComponentProps {}
const QuizListComponent: React.FC<QuizListProps> = ({ history, gids, authData,PostQuizList,PostQuizAttempt,QuizList,QuizAttempt }) => {
  const location = useLocation();
  const [Moved,setMoved] = useState(false);
  // useEffect(()=>{
  //   if(authData===null) history.push("/login")
  //   let fired = false
  //   if(authData){
  //     if(location.pathname.includes("/group/detail")&&authData){
  //       PostQuizList(gids);
  //       fired = true;
  //     }
  //     if(authData&&!fired){
  //       PostQuizList(gids);
  //     }
  //   }   
  // },[authData])
  useEffect(()=>{
    if(history.location.pathname.includes("/group/detail"))setMoved(false)
  },[history.location])
  useEffect(()=>{
    if(!QuizAttempt || Moved)    {return}
    setMoved(true);
    history.push("/quiz/start/" + QuizAttempt?.quiz?.quid);
  },[QuizAttempt])
  useEffect(()=>{
    PostQuizList(gids);
  },[])
  if (QuizList) {
    return (
      <IonList lines="full" className="bg-transparent">
        {QuizList.map((item: QuizList, index: React.Key | undefined) => (
          <IonItem
          className="bg-transparent"
            key={index}
            onClick={()=>PostQuizAttempt(item.quid)}
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
    authData: state.base.authData,
    QuizList: state.quiz.QuizList,
    QuizAttempt:state.quiz.QuizAttempt
  }),
  mapDispatchToProps: {PostQuizList,PostQuizAttempt},
  component: withRouter(QuizListComponent),
});
