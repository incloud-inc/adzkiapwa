import {
    IonButton,
    IonFooter,
    IonSlide, IonSlides
} from "@ionic/react";
import React from "react";
import { RouteComponentProps, useParams, withRouter } from "react-router";
import { connect } from "../../data/connect";
import { PostQuizList, setSelectedQuiz } from "../../data/quiz/quiz.actions";
import { QuizAnswer, QuizAttempt, QuizAttemptQuestions } from "../../models/Quiz";
    interface OwnProps {
        slideQuiz: any;
        slideQuizRef: any;
        RecentQuestionNumber: any;
      onChangeNumber: (index:number,item: QuizAttemptQuestions) => void;
    }
    interface StateProps {
      QuizAttempt: QuizAttempt;
      QuizAnswer:QuizAnswer[][];
    }
    
    interface DispatchProps {
      PostQuizList:typeof PostQuizList;
      setSelectedQuiz:typeof setSelectedQuiz;
    }
    interface QuizSubmitProps
      extends OwnProps,
        StateProps,
        DispatchProps,
        RouteComponentProps {}
    interface Param {
      quid: string
    }
    const QuizFooter: React.FC<QuizSubmitProps> = ({ QuizAttempt ,slideQuiz,slideQuizRef,RecentQuestionNumber, onChangeNumber,QuizAnswer}) => {
      let param: Param = useParams();
        return (
            <IonFooter className="ion-padding quizanswer">
            <IonSlides options={slideQuiz} ref={slideQuizRef}>
              {QuizAttempt.questions
                ? QuizAttempt.questions.map((item: any, index: any) => (
                  <IonSlide key={index}>
                    <IonButton
                      className="quizNumberButton"
                      size="small"
                      color={
                        index === RecentQuestionNumber
                          ? "light"
                          : QuizAnswer[parseInt(param.quid)] &&
                            QuizAnswer[parseInt(param.quid)][index] &&
                            QuizAnswer[parseInt(param.quid)][index].AnswerStatus === "answered"
                            ? "success"
                            : QuizAnswer[parseInt(param.quid)] &&
                              QuizAnswer[parseInt(param.quid)][index] &&
                              QuizAnswer[parseInt(param.quid)][index].AnswerStatus === "skipped"
                              ? "medium"
                              : QuizAnswer[parseInt(param.quid)] &&
                                QuizAnswer[parseInt(param.quid)][index] &&
                                QuizAnswer[parseInt(param.quid)][index].AnswerStatus === "reviewlater"
                                ? "warning"
                                : "dark"
                      }
                      onClick={() => onChangeNumber(index,item)}
                    >
                      {index + 1}
                    </IonButton>
                  </IonSlide>
                ))
                : ""}
            </IonSlides>
          </IonFooter>
        );
    };
    
    export default connect<OwnProps, StateProps, DispatchProps>({
      mapStateToProps: (state) => ({
        QuizAttempt: state.quiz.QuizAttempt,
        QuizAnswer: state.quiz.QuizAnswer,
      }),
      mapDispatchToProps: {PostQuizList,setSelectedQuiz},
      component: withRouter(QuizFooter),
    });
    