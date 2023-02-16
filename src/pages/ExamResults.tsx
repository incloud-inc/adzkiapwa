import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent, IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  RefresherEventDetail
} from "@ionic/react";
import { chevronDownCircleOutline } from "ionicons/icons";
import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import GeneralSkeleton from "../components/Shared/GeneralSkeleton";
import { connect } from "../data/connect";
import { PostQuizResultList } from "../data/quiz/quiz.actions";
import { AuthData } from "../models/Base";
import { QuizResultDetail, QuizResultList } from "../models/Quiz";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  authData: AuthData;
  QuizResultList:QuizResultList
}

interface DispatchProps {
  PostQuizResultList: typeof PostQuizResultList;
}
interface ExamResultsProps extends OwnProps, StateProps, DispatchProps {}

const ExamResults: React.FC<ExamResultsProps> = ({ history, authData,PostQuizResultList,QuizResultList }) => {
  useEffect(()=>{    
    if(authData===null) 
    {history.replace('/login') ;return;}
    if(authData && !QuizResultList){
      PostQuizResultList()
    }
  },[authData]);
  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await PostQuizResultList()
    event.detail.complete();
  }
  if (QuizResultList) {
    return (
      <IonPage id="session-detail-page ">
        <IonToolbar>
          {/* <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/portal"></IonBackButton>
          </IonButtons> */}
          <IonTitle>Hasil Ujian</IonTitle>
        </IonToolbar>
        <IonContent className="bg-gray">
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                <IonRefresherContent
                  pullingIcon={chevronDownCircleOutline}
                  pullingText="Pull to refresh"
                  refreshingSpinner="circles"
                ></IonRefresherContent>
              </IonRefresher>
          {QuizResultList.quizzes?.map((item: QuizResultDetail, index: any) => (
            <IonCard             
            onClick={() => {
              history.push("/quiz/result/" + item.rid);
            }}>
              <IonCardContent>
                <IonRow>
                  <IonCol> Paket Tryout {index + 1}</IonCol>
                  <IonCol size="3"> Nilai : 9{index}</IonCol>
                </IonRow>
              </IonCardContent>
            </IonCard>
          ))}
        </IonContent>
      </IonPage>
    );
  } else if (QuizResultList === null) {
    return (
      <IonPage>
        <IonToolbar>
          {/* <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/portal"></IonBackButton>
          </IonButtons> */}
          <IonTitle>Hasil Ujian</IonTitle>
        </IonToolbar>
        <IonContent className="bg-gray">
          <div className="ion-text-center ion-padding">
            <IonText>Belum pernah submit quiz</IonText>
          </div>
        </IonContent>
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
    QuizResultList: state.quiz.QuizResultList
  }),
  mapDispatchToProps: {
    PostQuizResultList
  },
  component: ExamResults,
});
