import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  useIonViewWillEnter,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { Swiper as SwiperCore } from "swiper";
import { arrowForward } from "ionicons/icons";
import { setMenuEnabled } from "../data/sessions/sessions.actions";
import { setHasSeenTutorial } from "../data/base/base.actions";
import "./Tutorial.scss";
import "swiper/swiper.min.css";
import "@ionic/react/css/ionic-swiper.css";
import { connect } from "../data/connect";
import { RouteComponentProps } from "react-router";
import { Button } from "antd";

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setHasSeenTutorial: typeof setHasSeenTutorial;
  setMenuEnabled: typeof setMenuEnabled;
}

interface TutorialProps extends OwnProps, DispatchProps {}

const Tutorial: React.FC<TutorialProps> = ({
  history,
  setHasSeenTutorial,
  setMenuEnabled,
}) => {
  const [showSkip, setShowSkip] = useState(true);
  let [swiper, setSwiper] = useState<SwiperCore>();
  useIonViewWillEnter(() => {
    setMenuEnabled(false);
  });

  const startApp = async () => {
    await setHasSeenTutorial(true);
    await setMenuEnabled(true);
    history.push("/tabs/portal", { direction: "none" });
  };

  const handleSlideChangeStart = () => {
    if (!swiper) return;
    setShowSkip(!swiper.isEnd);
  };

  return (
    <IonPage id="tutorial-page">
      <IonHeader no-border>
        <IonToolbar>
          <IonButtons slot="end">
            {showSkip && (
              <IonButton color="primary" onClick={startApp}>
                Lewati
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <Swiper
          onSwiper={setSwiper}
          onSlideChangeTransitionStart={handleSlideChangeStart}
        >
          <SwiperSlide>
            <img
              src="assets/img/ica-slidebox-img-1.png"
              alt=""
              className="slide-image"
            />
            <h2 className="slide-title">
              Welcome to <b>Adzkia</b>
            </h2>
            <p>
              Adzkia adalah Platform Ujian Online yang telah banyak dipercaya
              oleh ratusan lembaga maupun sekolah dan kampus{" "}
            </p>
          </SwiperSlide>

          <SwiperSlide>
            <img
              src="assets/img/ica-slidebox-img-2.png"
              alt=""
              className="slide-image"
            />
            <h2 className="slide-title">Kenapa Adzkia?</h2>
            <p>
              Kamu bisa memulai menggunakan adzkia mulai dari paket gratis
              hingga berbayar{" "}
            </p>
          </SwiperSlide>

          <SwiperSlide>
            <img
              src="assets/img/ica-slidebox-img-3.png"
              alt=""
              className="slide-image"
            />
            <h2 className="slide-title">Apa saja fitur premiumnya?</h2>
            <p>Fitur Premium Adzkia adalah</p>
          </SwiperSlide>

          <SwiperSlide>
            <img
              src="assets/img/ica-slidebox-img-4.png"
              alt=""
              className="slide-image"
            />
            <h2 className="slide-title">Ready to Play?</h2>
            <IonButton fill="clear" onClick={startApp}>
              Continue
              <IonIcon slot="end" icon={arrowForward} />
            </IonButton>
          </SwiperSlide>
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setHasSeenTutorial,
    setMenuEnabled,
  },
  component: Tutorial,
});
