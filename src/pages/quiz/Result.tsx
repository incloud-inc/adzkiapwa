import {
  IonBackButton, IonButtons,
  IonCard, IonCol,
  IonContent, IonGrid,
  IonHeader,
  IonIcon,
  IonLoading,
  IonPage, IonRow,
  IonSlide,
  IonSlides,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  useIonViewWillEnter
} from "@ionic/react";
import {
  briefcase,
  camera,
  cart, checkmarkCircleSharp, closeCircleSharp, radio
} from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie-player";
import { RouteComponentProps, useParams } from "react-router";
import { BaseUrl } from "../../AppConfig";
import GeneralSkeleton from "../../components/Shared/GeneralSkeleton";
import { connect } from "../../data/connect";
import SuccessLottie from "../../lotties/Success.json";
import "./Result.scss";
interface OwnProps extends RouteComponentProps {}

interface StateProps {
  authData: any;
}

interface DispatchProps {}

interface ResultProps extends OwnProps, StateProps, DispatchProps {}
const slideQuiz = {
  initialSlide: 0,
  slidesPerView: 10,
  speed: 400,
  spaceBetween: 20,
};
const Result: React.FC<ResultProps> = ({ authData, history }) => {
  let param: any = useParams();

  const [showLoading, setShowLoading] = useState(false);
  const slideQuizRef = useRef<HTMLIonSlidesElement>(null);
  const [ResultData, setResultData] = useState<any>(undefined);
//   const discussion = [
//   {
//     kategori: 'Penalaran Umum',
//     benar: '19',
//     salah: '1',
//     skor: '19'
//   },

//   {
//     name: 'Pe',
//     email: 'something@gmail.com'
//   }
// ];
// const listItems = numbers.map((number) =>
//   <li>{number}</li>
// );

  const fetchResult = () => {    
    const BodyData = new FormData();
    
    if (authData) {
      BodyData.append("token", authData && authData.token);
    }
    BodyData.append("rid", param.rid || "");
    console.log(authData);

    fetch(
      authData
        ? BaseUrl+"quiz/resultdetail"
        : BaseUrl+"quizpublic/resultdetail",
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
        
        if (res.status === "Open") {
          history.replace("/tabs/portal");
          setResultData(null);
        } else {
          setResultData(res);
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  useIonViewWillEnter(() => {
      fetchResult();
    // console.log(param.rid)
  });
  useEffect(()=>{
    if (authData && authData.token) {
      fetchResult();
    }
  },[authData])
  
  if (ResultData) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs/portal"></IonBackButton>
            </IonButtons>
            <IonTitle className="ion-no-padding">Hasil Ujian</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="bg-white">
          <IonGrid className="bg-gray ion-padding">
            <IonRow>
              <IonCol>
                <Lottie
                  animationData={SuccessLottie}
                  play={true}
                  style={{ marginTop: "-80px", marginBottom: "-80px" }}
                ></Lottie>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="6">Correct</IonCol>
              <IonCol size="6">: {ResultData.categories && ResultData.categories.length > 0 ? ResultData.categories.reduce(function (acc:any, obj:any) { return acc + obj.correct; }, 0) : 0}</IonCol>
              <IonCol size="6">Incorrect</IonCol>
              <IonCol size="6">: {ResultData.categories && ResultData.categories.length > 0 ? ResultData.categories.reduce(function (acc:any, obj:any) { return acc + obj.incorrect; }, 0) : 0}</IonCol>
              <IonCol size="6">Not Attempted</IonCol>
              <IonCol size="6">: {ResultData.categories && ResultData.categories.length > 0 ? ResultData.categories.reduce(function (acc:any, obj:any) { return acc + obj.not_attempted; }, 0) : 0}</IonCol>
            </IonRow>
          </IonGrid>
          <div className="bg-gray ion-padding">
            <IonText>
              <h5>Categorywise Analysis</h5>
            </IonText>
            <IonSlides options={{ slidesPerView: 1.2 }}>
              {ResultData.categories.map(
                (Category: any, CategoryIndex: any) => (
                  <IonSlide key={CategoryIndex} class="ion-text-left">
                    <IonCard className="ion-padding">
                      <IonText>
                        <h5>{Category.category_name}</h5>
                      </IonText>
                      <IonGrid>
                        <IonRow>
                          {/* <IonCol size="6">Score</IonCol>
                          <IonCol size="6">: {Category.score || 0}</IonCol>
                          <IonCol size="6">Time Spent</IonCol>
                          <IonCol size="6">
                            : {Category.time_spent || 0} %
                          </IonCol> */}
                          <IonCol size="6">Correct</IonCol>
                          <IonCol size="6">: {Category.correct || 0}</IonCol>
                          <IonCol size="6">Incorrect</IonCol>
                          <IonCol size="6">: {Category.incorrect || 0}</IonCol>
                          <IonCol size="6">Not Attempted</IonCol>
                          <IonCol size="6">
                            : {Category.not_attempted || 0}
                          </IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonCard>
                  </IonSlide>
                )
              )}
            </IonSlides>
          </div>
          {/* <div className="bg-gray ion-padding">
          <IonGrid className="bg-white ion-padding ion-br-8 text-center">
              <IonRow className="lala">
                <IonCol size="3">
                  <IonText color="medium">Kategori</IonText>
                </IonCol>
                <IonCol size="3">
                  <IonText color="medium">Benar</IonText>
                </IonCol>
                <IonCol size="3">
                  <IonText color="medium">Salah</IonText>
                </IonCol>
                <IonCol size="3">
                  <IonText color="medium">Score</IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div> */}
          <div className="bg-gray ion-padding" hidden={ResultData.questions?false:true}>
            <IonText>
              <h5>Discussion</h5>
            </IonText>
            <IonSlides options={{ slidesPerView: 1.2 }}>
              {ResultData.questions?.map(
                
                (Category: any, CategoryIndex: any) => {
                  return Category.status_answer === "Incorrect" ? (
                  <IonSlide key={CategoryIndex} class="ion-text-left">
                    <IonCard className="ion-padding">
                      <IonText>
                      <p className="textkui mb-16">Soal Nomer {CategoryIndex + 1} dari {ResultData.questions.length}</p>
                        
                      </IonText>
                      <IonText>
                        <p className="textkui mb-16" dangerouslySetInnerHTML={{__html: Category.question}}/>
                      </IonText>
                      
                      <div className="FalseAnswer">
                        <div className="d-flex align-center mb-16">
                          <IonText>
                            <p className="textkui">Jawaban Anda</p>
                          </IonText>
                          <IonIcon className="ml-8 closemark" icon={closeCircleSharp} />
                        </div>

                        <IonText dangerouslySetInnerHTML={{__html: Category.your_answer}}/>
                      </div>
                      <div className="TrueAnswer">
                      <div className="d-flex align-center mb-16">
                          <IonText>
                            <p className="textkui">Jawaban Benar</p>
                          </IonText>
                          <IonIcon className="ml-8 checkmark" icon={checkmarkCircleSharp} />
                        </div>
                        <IonText dangerouslySetInnerHTML={{__html: Category.correct_answer}}/>
                      </div>
                      <div className="discussionTask">
                        <IonText>
                          <p className="textkui mb-16">Pembahasan</p>
                        </IonText>
                        <div dangerouslySetInnerHTML={{__html: Category.discussion}}/>
                      </div>
                    </IonCard>
                  </IonSlide>
                  ) : (
                    <IonSlide key={CategoryIndex} class="ion-text-left">
                    <IonCard className="ion-padding">
                      <IonText>
                        <p className="textkui mb-16">Soal Nomer {CategoryIndex + 1} dari {ResultData.questions.length}</p>
                      </IonText>
                      <IonText>
                        <p className="textkui mb-16" dangerouslySetInnerHTML={{__html: Category.question}}/>
                      </IonText>
                      <div className="TrueAnswer">
                      <div className="d-flex align-center mb-16">
                          <IonText>
                            <p className="textkui">Jawaban Benar</p>
                          </IonText>
                          <IonIcon className="ml-8 checkmark" icon={checkmarkCircleSharp} />
                        </div>
                        <IonText dangerouslySetInnerHTML={{__html: Category.correct_answer}}/>
                      </div>
                      <div className="discussionTask">
                        <IonText>
                          <p className="textkui mb-16">Pembahasan</p>
                        </IonText>
                        <div dangerouslySetInnerHTML={{__html: Category.discussion}}/>
                      </div>
                    </IonCard>
                  </IonSlide>
                  )
              }
              )}
            </IonSlides>
          </div>
          <div className="bg-gray resultDetailCard" hidden={!authData}>
            <IonGrid className="bg-white ion-padding">
              <IonRow>
                <IonCol size="12">
                  <IonText color="medium">Top 10</IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="1">
                  <IonText color="medium">#</IonText>
                </IonCol>
                <IonCol size="9">
                  <IonText color="medium">Quiz Name</IonText>
                </IonCol>
                <IonCol size="2">
                  <IonText color="medium">(%)</IonText>
                </IonCol>
              </IonRow>
              {JSON.parse(ResultData.top_10_results).map(
                (TopItem: any, TopIndex: any) => (
                  <IonRow hidden={TopIndex == 0}>
                    <IonCol size="1">
                      <IonText color="medium">{TopIndex}</IonText>
                    </IonCol>
                    <IonCol size="9">
                      <IonText color="medium">{TopItem[0]}</IonText>
                    </IonCol>
                    <IonCol
                      size="2
                    "
                    >
                      <IonText color="medium">{TopItem[1]}%</IonText>
                    </IonCol>
                  </IonRow>
                )
              )}
            </IonGrid>
            <IonGrid className="bg-white ion-padding" hidden>
              <IonRow>
                <IonCol size="12">
                  <IonText color="medium">Ujian yang dicoba</IonText>
                </IonCol>
              </IonRow>
              <IonRow class="ion-align-items-center">
                <IonCol size="2">
                  <IonIcon icon={cart} size="large"></IonIcon>
                </IonCol>
                <IonCol size="5">
                  <IonText color="medium">
                    <b>Nama Ujian</b>
                  </IonText>
                  <br />
                  <IonText color="medium">ID Ujian</IonText>
                </IonCol>
                <IonCol size="5" className="ion-text-right">
                  <IonText color="medium">
                    <b>NILAI</b>
                  </IonText>
                  <br />
                  <IonText color="medium">Ranking</IonText>
                </IonCol>
              </IonRow>
              <IonRow class="ion-align-items-center">
                <IonCol size="2">
                  <IonIcon icon={radio} size="large"></IonIcon>
                </IonCol>
                <IonCol size="5">
                  <IonText color="medium">
                    <b>Ujian lainnya</b>
                  </IonText>
                  <br />
                  <IonText color="medium">15 Jan</IonText>
                </IonCol>
                <IonCol size="5" className="ion-text-right">
                  <IonText color="medium">
                    <b>100.000</b>
                  </IonText>
                  <br />
                  <IonText color="medium">Futsal</IonText>
                </IonCol>
              </IonRow>
              <IonRow class="ion-align-items-center">
                <IonCol size="2">
                  <IonIcon icon={camera} size="large"></IonIcon>
                </IonCol>
                <IonCol size="5">
                  <IonText color="medium">
                    <b>Ujian berikutnya</b>
                  </IonText>
                  <br />
                  <IonText color="medium">18 Agu</IonText>
                </IonCol>
                <IonCol size="5" className="ion-text-right">
                  <IonText color="medium">
                    <b>400.000</b>
                  </IonText>
                  <br />
                  <IonText color="medium">Badminton</IonText>
                </IonCol>
              </IonRow>
              <IonRow class="ion-align-items-center">
                <IonCol size="2">
                  <IonIcon icon={briefcase} size="large"></IonIcon>
                </IonCol>
                <IonCol size="5">
                  <IonText color="medium">
                    <b>Try out</b>
                  </IonText>
                  <br />
                  <IonText color="medium">17 Nov</IonText>
                </IonCol>
                <IonCol size="5" className="ion-text-right">
                  <IonText color="medium">
                    <b>300.000</b>
                  </IonText>
                  <br />
                  <IonText color="medium">Footbal</IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
          <IonLoading isOpen={showLoading} message={"Proses..."} />
        </IonContent>
      </IonPage>
    );
  } else if (ResultData === null) {
    return (
      <IonPage>
        <IonContent>
          <GeneralSkeleton></GeneralSkeleton>
        </IonContent>
      </IonPage>
    );
  } else {
    return (
      <IonPage>
        <IonContent>
          <GeneralSkeleton></GeneralSkeleton>
        </IonContent>
      </IonPage>
    );
  }
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    authData: state.base.authData,
  }),
  component: Result,
});
