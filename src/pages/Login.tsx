import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonRow,
  IonCol,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  IonRouterLink,
} from "@ionic/react";
import "./Login.scss";
import { setAuthData } from "../data/user/user.actions";
import { connect } from "../data/connect";
import { RouteComponentProps } from "react-router";
import Lottie from "react-lottie-player";
import SecureLogin from "../lotties/SecureLogin.json";

interface OwnProps extends RouteComponentProps {}

interface StateProps {}
interface DispatchProps {
  setAuthData: typeof setAuthData;
}

interface LoginProps extends OwnProps, DispatchProps, StateProps {}

const Login: React.FC<LoginProps> = ({ setAuthData, history }) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [EmailError, setEmailError] = useState(false);
  const [PasswordError, setPasswordError] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!Email) {
      setEmailError(true);
    }
    if (!Password) {
      setPasswordError(true);
    }

    if (Email && Password) {
      setFormSubmitted(true);
      const BodyData = new FormData();
      BodyData.append("email", Email);
      BodyData.append("password", Password);
      fetch("https://api.adzkia.id/auth/login", {
        method: "POST",
        body: BodyData,
      })
        .then((res) => {
          setFormSubmitted(false);
          return res.json();
        })
        .then((res) => {
          if (res.data && res.data.uid) {
            res.data.token = res.token;
            setAuthData(res.data);
            history.replace("/tabs/portal");
          } else {
            alert(res.message || "Gagal Login");
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
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
                Email
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
                Lupa Password? Reset Password
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
  mapDispatchToProps: {
    setAuthData,
  },
  component: Login,
});
