import {
  IonBadge,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonText,
} from "@ionic/react";
import { documentTextOutline, star } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "../../data/connect";
import { PostQuizList, PostQuizValidate, setSelectedQuiz } from "../../data/quiz/quiz.actions";
import { QuizList } from "../../models/Quiz";
import GeneralSkeleton from "../Shared/GeneralSkeleton";
interface OwnProps {
  gids: string;
}

interface StateProps {
  QuizList: QuizList[];
}

interface DispatchProps {
  PostQuizList:typeof PostQuizList;
  setSelectedQuiz:typeof setSelectedQuiz;
}
interface QuizListProps
  extends OwnProps,
    StateProps,
    DispatchProps,
    RouteComponentProps {}
const QuizListComponent: React.FC<QuizListProps> = ({ history, gids,PostQuizList,QuizList,setSelectedQuiz }) => {
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
  // useEffect(()=>{
  //   if(!QuizAttempt || Moved)    {return}
  //   setMoved(true);
  //   history.replace("/quiz/attempt/"+QuizAttempt?.quiz?.quid);
  //   // history.replace("/quiz/start/" + QuizAttempt?.quiz?.quid);
  // },[QuizAttempt])
  // useEffect(()=>{
    
  //   if(!SelectedQuiz || Moved)    {return}
  //   setMoved(true);

  //   history.goBack();
  // },[SelectedQuiz])
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
            // routerLink="/quiz/attempt"
            onClick={()=>{
              setSelectedQuiz(item);
            }}
          >
            <IonBadge color="primary" className="br-8" slot="start">
            <IonIcon icon={documentTextOutline} size="large" color="light"></IonIcon>
            </IonBadge>
            <IonText class="ion-padding-bottom ion-padding-top">{item.quiz_name || ""}</IonText>
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
    QuizList: state.quiz.QuizList,
  }),
  mapDispatchToProps: {PostQuizList,setSelectedQuiz},
  component: withRouter(QuizListComponent),
});
