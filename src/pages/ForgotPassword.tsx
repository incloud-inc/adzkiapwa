import {
  IonButton, IonCol, IonContent, IonInput, IonItem,
  IonLabel, IonList, IonPage, IonRouterLink, IonRow, IonText
} from "@ionic/react";
import React, { useState } from "react";
import Lottie from "react-lottie-player";
import { RouteComponentProps } from "react-router";
import { setForgotPassword } from "../data/base/base.actions";
import { connect } from "../data/connect";
import ForgotPasswordL from "../lotties/ForgotPassword.json";
import WAL from "../lotties/WA.json";
import "./ForgotPassword.scss";

interface OwnProps extends RouteComponentProps {}

interface StateProps {}
interface DispatchProps {
  setForgotPassword: typeof setForgotPassword
}

interface LoginProps extends OwnProps, DispatchProps, StateProps {}

const ForgotPassword: React.FC<LoginProps> = ({ setForgotPassword,history }) => {
  const [Phone, setPhone] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [PhoneError, setPhoneError] = useState(false);
  const [ForgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);

  const ForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!Phone) {
      setPhoneError(true);
      setTimeout(() => {
        setPhoneError(false)
      }, 3000);
      return;
    }
    await setForgotPassword({phone:Phone})
    
  };

  return (
    <IonPage id="login-page">
      <IonContent className="ion-padding">
        <div className="ion-text-center ion-margin-top ion-margin-bottom">
          <img src="/assets/img/brand/logo adzkia.png" width="80%" />
        </div>
        <div
          style={{ width: "100%", margin: "0 auto" }}
          hidden={ForgotPasswordSuccess}
        >
          <Lottie animationData={ForgotPasswordL} play={true}></Lottie>
        </div>
        <div
          style={{ width: "30%", margin: "0 auto" }}
          hidden={!ForgotPasswordSuccess}
        >
          <Lottie animationData={WAL} play={true}></Lottie>
        </div>
        <form noValidate onSubmit={ForgotPassword}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">
                Nomor WA
              </IonLabel>
              <IonInput
                placeholder="Contoh : 0812 3456 7890"
                name="Phone"
                type="text"
                value={Phone}
                spellCheck={false}
                autocapitalize="off"
                onIonChange={(e) => setPhone(e.detail.value!)}
                required
              ></IonInput>
            </IonItem>

            {PhoneError && (
              <IonText color="danger">
                <p className="ion-padding-start">Phone is required</p>
              </IonText>
            )}
          </IonList>
          <IonText className="ion-margin" color="medium">
            <small>Password Baru akan dikrimkan ke nomor WA anda</small>
          </IonText>
          <IonRow>
            <IonCol>
              <IonButton
                type="submit"
                expand="block"
                disabled={formSubmitted}
                color="success"
              >
                RESET PASSWORD
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                type="button"
                expand="block"
                disabled={formSubmitted}
                routerLink="/login"
              >
                LOGIN
              </IonButton>
              {/* <IonButton routerLink="/signup" color="light" expand="block">
                Daftar
              </IonButton> */}
            </IonCol>
            <IonCol size="12" className="ion-text-center">
              <IonRouterLink color="primary" routerLink="/signup">
                Belum punya akun? Daftar
              </IonRouterLink>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapStateToProps: (state) => ({}),
  mapDispatchToProps:{
    setForgotPassword
  },
  component: ForgotPassword,
});
