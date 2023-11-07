import {
  IonButton, IonCol, IonContent, IonInput, IonItem,
  IonLabel, IonList, IonPage, IonRouterLink, IonRow, IonText, useIonAlert
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { RouteComponentProps } from "react-router";
import { setLogin } from "../data/base/base.actions";
import { BaseState } from "../data/base/base.state";
import { connect } from "../data/connect";
import SecureLogin from "../lotties/SecureLogin.json";
import "./Login.scss";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  base:BaseState
}
interface DispatchProps {
  setLogin: typeof setLogin;
}

interface LoginProps extends OwnProps, DispatchProps, StateProps {}

const Login: React.FC<LoginProps> = ({ setLogin, base,history }) => {
  const [Email, setEmail] = useState("wilmasrur@gmail.com");
  const [Password, setPassword] = useState("1");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [EmailError, setEmailError] = useState(false);
  const [PasswordError, setPasswordError] = useState(false);
  const [present] = useIonAlert();

  useEffect(()=>{    
    if(formSubmitted && base.authData){
      setFormSubmitted(false)
      history.push('/tabs/portal')
    }
  },[base])
  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!Email) {
      setEmailError(true);
      setTimeout(() => {
        setEmailError(false)
      }, 1000);
      return;
    }
    if (!Password) {
      setPasswordError(true);
      setTimeout(() => {
        setPasswordError(false)
      }, 1000);
      return;
    }
    setLogin({email:Email,password:Password});
  };

  return (
    <IonPage id="login-page">
      <IonContent className="ion-padding">
        <div className="ion-text-center ion-margin-top ion-margin-bottom">
          <img src="/assets/img/brand/logo adzkia.png" width="80%" />
        </div>
        <div style={{ width: "60%", margin: "0 auto" }}>
          <Lottie animationData={SecureLogin} play={true}></Lottie>
        </div>
        <form noValidate onSubmit={login}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">
                Email Saya
              </IonLabel>
              <IonInput
                name="Email"
                type="text"
                value={Email}
                spellCheck={false}
                autocapitalize="off"
                onIonChange={(e) => setEmail(e.detail.value!)}
                required
              ></IonInput>
            </IonItem>

            {formSubmitted && EmailError && (
              <IonText color="danger">
                <p className="ion-padding-start">Email is required</p>
              </IonText>
            )}

            <IonItem>
              <IonLabel position="stacked" color="primary">
                Password
              </IonLabel>
              <IonInput
                name="Password"
                type="password"
                value={Password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              ></IonInput>
            </IonItem>

            {formSubmitted && PasswordError && (
              <IonText color="danger">
                <p className="ion-padding-start">Password is required</p>
              </IonText>
            )}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">
                Masuk
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton color="light" expand="block" routerLink="/signup">
                Daftar
              </IonButton>
            </IonCol>
            <IonCol size="12" className="ion-text-center">
              <IonRouterLink color="primary" routerLink="/forgotpassword">
                Lupa Password? <b>Reset Password</b>
              </IonRouterLink>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    base:state.base
  }),
  mapDispatchToProps: {
    setLogin,
  },
  component: Login,
});
