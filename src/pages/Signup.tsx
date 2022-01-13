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
} from "@ionic/react";
import "./Login.scss";
import { setAuthData } from "../data/user/user.actions";
import { connect } from "../data/connect";
import { RouteComponentProps } from "react-router";
import Lottie from "react-lottie-player";
import SecureLogin from "../lotties/SecureLogin.json";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  authToken: string;
}
interface DispatchProps {
  setAuthData: typeof setAuthData;
}

interface LoginProps extends OwnProps, StateProps, DispatchProps {}

const Login: React.FC<LoginProps> = ({ setAuthData, history, authToken }) => {
  const [Email, setEmail] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Password, setPassword] = useState("");
  const [Phone, setPhone] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [EmailError, setEmailError] = useState(false);
  const [FirstNameError, setFirstNameError] = useState(false);
  const [LastNameError, setLastNameError] = useState(false);
  const [PasswordError, setPasswordError] = useState(false);
  const [PhoneError, setPhoneError] = useState(false);
  const RegisterCheck = () => {
    let status = true;
    if (Email === "") {
      status = false;
      setEmailError(true);
    }
    if (Password === "") {
      status = false;
      setPasswordError(true);
    }
    if (FirstName === "") {
      status = false;
      setFirstNameError(true);
    }
    if (LastName === "") {
      status = false;
      setLastNameError(true);
    }

    if (Phone === "") {
      status = false;
      setPhoneError(true);
    }
    return status;
  };
  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!RegisterCheck()) {
      return false;
    }
    setFormSubmitted(true);
    const BodyData = new FormData();
    BodyData.append("email", Email);
    BodyData.append("password", Password);
    BodyData.append("first_name", FirstName);
    BodyData.append("last_name", LastName);
    BodyData.append("phone", Phone);
    BodyData.append("token", authToken);
    fetch("https://api3.adzkia.id/auth/register", {
      method: "POST",
      headers: {},
      body: BodyData,
    })
      .then((res) => {
        setFormSubmitted(false);
        // if (!res.ok) {
        //   console.log(res.json());

        //   throw new Error("Server Bermasalah");
        // }
        return res.json();
      })
      .then((res) => {
        if (res.token) {
          res.data.token = res.token;
          alert(Email + " berhasil terdaftar");
          alert(JSON.stringify(res.data));

          setAuthData(res.data);
          history.replace("/tabs/portal");
        } else {
          alert(res.message || "gagal terdaftar");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <IonPage id="signup-page">
      <IonContent>
        <div className="ion-text-center ion-margin-top ion-margin-bottom">
          <img src="/assets/img/brand/logo adzkia.png" width="80%" />
        </div>
        <div style={{ width: "60%", margin: "0 auto" }}>
          <Lottie animationData={SecureLogin} play={true}></Lottie>
        </div>

        <form noValidate onSubmit={register}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">
                E-Mail
              </IonLabel>
              <IonInput
                type="text"
                value={Email}
                onIonChange={(e) => {
                  setEmail(e.detail.value!);
                }}
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
                name="password"
                type="password"
                value={Password}
                onIonChange={(e) => {
                  setPassword(e.detail.value!);
                }}
              ></IonInput>
            </IonItem>
            {formSubmitted && PasswordError && (
              <IonText color="danger">
                <p className="ion-padding-start">Password is required</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="primary">
                First Name
              </IonLabel>
              <IonInput
                type="text"
                value={FirstName}
                onIonChange={(e) => {
                  setFirstName(e.detail.value!);
                }}
                required
              ></IonInput>
            </IonItem>

            {formSubmitted && FirstNameError && (
              <IonText color="danger">
                <p className="ion-padding-start">First Name is required</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="primary">
                Last Name
              </IonLabel>
              <IonInput
                name="name"
                type="text"
                value={LastName}
                onIonChange={(e) => {
                  setLastName(e.detail.value!);
                }}
              ></IonInput>
            </IonItem>
            {formSubmitted && LastNameError && (
              <IonText color="danger">
                <p className="ion-padding-start">Last Name is required</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="primary">
                Phone
              </IonLabel>
              <IonInput
                type="number"
                value={Phone}
                onIonChange={(e) => {
                  setPhone(e.detail.value!);
                }}
              ></IonInput>
            </IonItem>

            {formSubmitted && PhoneError && (
              <IonText color="danger">
                <p className="ion-padding-start">Phone is required</p>
              </IonText>
            )}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block" disabled={formSubmitted}>
                {formSubmitted ? "Menunggu..." : "Daftar"}
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton
                routerLink="/"
                color="light"
                expand="block"
                disabled={formSubmitted}
              >
                Kembali Ke Beranda
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                routerLink="/login"
                color="light"
                expand="block"
                disabled={formSubmitted}
              >
                Login
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapStateToProps: (state) => ({
    authToken: state.user.authToken,
  }),
  mapDispatchToProps: {
    setAuthData,
  },
  component: Login,
});
