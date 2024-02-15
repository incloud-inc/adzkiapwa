// import {
//     IonContent
// } from "@ionic/react";
// import React, { useEffect,useState } from "react";
// import { RouteComponentProps, withRouter } from "react-router";
// import { connect } from "../../data/connect";
// import { SelectedQuiz } from "../../models/Quiz";
  
//   interface OwnProps {
//   }
  
//   interface StateProps {
//     SelectedQuiz: SelectedQuiz;
//   }
  
//   interface DispatchProps {
//   }
//   interface QuizAttemptProps
//     extends OwnProps,
//       StateProps,
//       DispatchProps,
//       RouteComponentProps {}
      
//   const Attempt: React.FC<QuizAttemptProps> = ({ history }) => {
     
//     // useEffect(()=>{
//     //     if(!SelectedQuiz){
//     //         history.replace('/')
//     //     }
//     // },[SelectedQuiz])
//     return (
//             <IonContent className="ion-padding" fullscreen>
//             <br />
//             tes
//             {/* <IonGrid>
//               <IonRow>
//                 <IonCol size="2"></IonCol>
//                 <IonCol>
//                   <Lottie animationData={Task} play={true}></Lottie>
//                 </IonCol>
//                 <IonCol size="2"></IonCol>
//               </IonRow>
//               <IonRow className="bb-1 ion-margin-bottom ion-padding-bottom">
//                 <IonCol size="12" className="ion-text-center">
//                   <h3 className="ion-no-margin">{SelectedQuiz?.quiz?.quiz_name || ""}</h3>
//                 </IonCol>
//               </IonRow>
//               <IonRow>
//                 <IonCol size="4">
//                   <IonText>Deskripsi</IonText>
//                 </IonCol>
//                 <IonCol size="8">
//                   <IonText>: </IonText>
//                   <div
//                     dangerouslySetInnerHTML={{
//                       __html: SelectedQuiz?.quiz?.description || "",
//                     }}
//                   ></div>
//                 </IonCol>
//               </IonRow>
//               <IonRow>
//                 <IonCol size="4">
//                   <IonText>Durasi</IonText>
//                 </IonCol>
//                 <IonCol size="8">
//                   <IonText>: {SelectedQuiz?.quiz?.duration || ""} menit</IonText>
//                 </IonCol>
//               </IonRow>
//               <IonRow>
//                 <IonCol size="4">
//                   <IonText>Indikasi Soal</IonText>
//                 </IonCol>
//                 <IonCol size="8">
//                   <IonBadge color="dark" style={{ margin: "4px" }}>
//                     not visited
//                   </IonBadge>
//                   <IonBadge color="success" style={{ margin: "4px" }}>
//                     answered
//                   </IonBadge>
//                   <IonBadge color="warning" style={{ margin: "4px" }}>
//                     review later
//                   </IonBadge>
//                   <IonBadge color="medium" style={{ margin: "4px" }}>
//                     skipped
//                   </IonBadge>
//                 </IonCol>
//                 <IonCol size="12 " className="ion-padding-top">
//                   <IonButton
//                     size="large"
//                     expand="block"
//                     onClick={() => {
//                     //   setShowModal(false);
//                     }}
//                   >
//                     Mulai Quiz &nbsp;{" "}
//                     <IonIcon icon={chevronForwardCircle}></IonIcon>
//                   </IonButton>
//                 </IonCol>
//                 <IonCol size="12 " className="">
//                   <IonButton
//                     size="large"
//                     expand="block"
//                     color="light"
//                     onClick={() => {
//                     //   setShowModal(false);
//                       history.goBack();
//                     }}
//                   >
//                     Batal
//                   </IonButton>
//                 </IonCol>
//               </IonRow>
//             </IonGrid> */}
//           </IonContent>
//     );
//   };
//   export default connect<OwnProps, StateProps, DispatchProps>({
//     mapStateToProps: (state) => ({
//     //   authData: state.base.authData,
//     //   QuizAttempt: state.quiz.QuizAttempt,
//     //   QuizAnswer: state.quiz.QuizAnswer
//     SelectedQuiz: state.quiz.SelectedQuiz
//     }),
//     mapDispatchToProps: {
//     //   setQuizAnswer,
//     //    PostQuizAttempt,
      
//     },
//     component: withRouter(Attempt),
// });
import {
  IonBadge,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  useIonViewWillEnter,
  useIonViewWillLeave
} from "@ionic/react";
import { chevronForwardCircle } from "ionicons/icons";
import React, { useEffect } from "react";
import Lottie from "react-lottie-player";
import { RouteComponentProps, withRouter } from "react-router";
import GeneralSkeleton from "../../components/Shared/GeneralSkeleton";
import { connect } from "../../data/connect";
import { PostQuizValidate, setQuizRid, setSelectedQuiz } from "../../data/quiz/quiz.actions";
import Task from "../../lotties/Task.json";
import { AuthData } from "../../models/Base";
import { QuizList } from "../../models/Quiz";
import { Link } from "react-router-dom";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  authData: AuthData;
  SelectedQuiz:QuizList;
  QuizRid:string;
}

interface DispatchProps {
  PostQuizValidate:typeof PostQuizValidate;
  setQuizRid:typeof setQuizRid;
  setSelectedQuiz:typeof setSelectedQuiz;
}
interface GroupDetailProps extends OwnProps, StateProps, DispatchProps {}

const Attempt: React.FC<GroupDetailProps> = ({ history,SelectedQuiz, QuizRid, setSelectedQuiz,PostQuizValidate,setQuizRid }) => {
  useIonViewWillEnter(()=>{        
      PostQuizValidate(SelectedQuiz);
  })
  useIonViewWillLeave(()=>{
    setQuizRid(undefined);
    setSelectedQuiz(undefined);
  })
  useEffect(() => {    
    if(QuizRid===''){
      setQuizRid(undefined);
      history.goBack();
    }
  },[QuizRid]);
  
  // const start =(()=>{
  //   const QT = localStorage.getItem("QuizTime")
  //   ? JSON.parse(localStorage.getItem("QuizTime") || "")
  //   : "";
  // const getQT: any = QT
  //   ? QT.find((x: { QuizId: string }) => x.QuizId === 'SelectedQuiz.quid')
  //   : undefined;
  // if(getQT) PostQuizAttempt
    
  // })
  if (QuizRid) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <IonGrid>
               <IonRow>
                 <IonCol size="2"></IonCol>
                 <IonCol>
                   <Lottie animationData={Task} play={true}></Lottie>
                 </IonCol>
                 <IonCol size="2"></IonCol>
               </IonRow>
               <IonRow className="bb-1 ion-margin-bottom ion-padding-bottom">
                 <IonCol size="12" className="ion-text-center">
                   <h3 className="ion-no-margin">{SelectedQuiz.quiz_name || ""}</h3>
                 </IonCol>
               </IonRow>
               <IonRow>
                 <IonCol>
                   <div dangerouslySetInnerHTML={{
                      __html: SelectedQuiz.description || "",
                    }}
                  ></div>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4">
                  <IonText>Durasi</IonText>
                </IonCol>
                <IonCol size="8">
                  <IonText>: {SelectedQuiz.duration || ""} menit</IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="4">
                  <IonText>Indikasi Soal</IonText>
                </IonCol>
                <IonCol size="8">
                  <IonBadge color="dark" style={{ margin: "4px" }}>
                    not visited
                  </IonBadge>
                  <IonBadge color="success" style={{ margin: "4px" }}>
                    answered
                  </IonBadge>
                  <IonBadge color="warning" style={{ margin: "4px" }}>
                    review later
                  </IonBadge>
                  <IonBadge color="medium" style={{ margin: "4px" }}>
                    skipped
                  </IonBadge>
                </IonCol>
                <IonCol size="12 " className="ion-padding-top">
                  <Link to={'/quiz/start/'+SelectedQuiz.quid} replace>
                  <IonButton
                    size="large"
                    expand="block"
                  >
                    Mulai Quiz &nbsp;{" "}
                    <IonIcon icon={chevronForwardCircle}></IonIcon>
                  </IonButton>
                  </Link>
                  
                </IonCol>
                <IonCol size="12 " className="">
                  <IonButton
                    size="large"
                    expand="block"
                    color="light"
                    onClick={() => {
                    //   setShowModal(false);
                      history.goBack();
                    }}
                  >
                    Batal
                  </IonButton>
                </IonCol>
              </IonRow>
             </IonGrid>
        </IonContent>
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
    SelectedQuiz: state.quiz.SelectedQuiz,
    QuizRid:state.quiz.QuizRid
  }),
  mapDispatchToProps: {
    PostQuizValidate,setQuizRid,setSelectedQuiz
  },
  component: withRouter(Attempt),
});
