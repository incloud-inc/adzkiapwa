import {
  IonButton, IonCol, IonContent, IonInput, IonItem,
  IonLabel, IonList, IonPage, IonRow, IonText
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import Lottie from "react-lottie-player";
import { RouteComponentProps } from "react-router";
import { setSignUp } from "../data/base/base.actions";
import { BaseState } from "../data/base/base.state";
import { connect } from "../data/connect";
import SecureLogin from "../lotties/SecureLogin.json";
import "./Login.scss";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  base:BaseState
}
interface DispatchProps {
  setSignUp: typeof setSignUp;
}

interface LoginProps extends OwnProps, StateProps, DispatchProps {}

const Login: React.FC<LoginProps> = ({ setSignUp,base, history }) => {
  const [Email, setEmail] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Password, setPassword] = useState("");
  const [Phone, setPhone] = useState("");
  const [AlamatLengkap, setAlamatLengkap] = useState("");
  const [AlamatSekolah, setAlamatSekolah] = useState("");
  // const [Email, setEmail] = useState("tes@gmail.com");
  // const [FirstName, setFirstName] = useState("1");
  // const [LastName, setLastName] = useState("1");
  // const [Password, setPassword] = useState("1");
  // const [Phone, setPhone] = useState("1");
  const [EmailError, setEmailError] = useState(false);
  const [FirstNameError, setFirstNameError] = useState(false);
  const [LastNameError, setLastNameError] = useState(false);
  const [PasswordError, setPasswordError] = useState(false);
  const [PhoneError, setPhoneError] = useState(false);
  const [AlamatLengkapError, setAlamatLengkapError] = useState(false);
  const [AlamatSekolahError, setAlamatSekolahError] = useState(false);
  const RegisterCheck = () => {
    let status = true;
    if (Email === "") {
      status = false;
      setEmailError(true);
      setTimeout(() => {
        setEmailError(false);
      }, 2000);
    }
    if (Password === "") {
      status = false;
      setPasswordError(true);
      setTimeout(() => {
        setPasswordError(false);
      }, 2000);
    }
    if (FirstName === "") {
      status = false;
      setFirstNameError(true);
      setTimeout(() => {
        setFirstNameError(false);
      }, 2000);
    }
    if (LastName === "") {
      status = false;
      setLastNameError(true);
      setTimeout(() => {
        setLastNameError(false);
      }, 2000);
    }

    if (Phone === "") {
      status = false;
      setPhoneError(true);
      setTimeout(() => {
        setPhoneError(false);
      }, 2000);
    }
    if (AlamatLengkap === "") {
      status = false;
      setAlamatLengkapError(true);
      setTimeout(() => {
        setAlamatLengkapError(false);
      }, 2000);
    }
    if (AlamatSekolah === "") {
      status = false;
      setAlamatSekolahError(true);
      setTimeout(() => {
        setAlamatSekolahError(false);
      }, 2000);
    }
    return status;
  };
  useEffect(()=>{
    if(base.authData){
      history.push('/tabs/portal')
    }
  },[base])
  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!RegisterCheck()) {
      return false;
    }
    setSignUp({
      email:Email,
      password:Password,
      first_name:FirstName,
      last_name:LastName,
      phone:Phone,
      alamat_lengkap:AlamatLengkap,
      alamat_sekolah:AlamatSekolah,
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

            {EmailError && (
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
            {PasswordError && (
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

            {FirstNameError && (
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
            {LastNameError && (
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

            {PhoneError && (
              <IonText color="danger">
                <p className="ion-padding-start">Phone is required</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="primary">
                Alamat Lengkap
              </IonLabel>
              <IonInput
                type="text"
                value={AlamatLengkap}
                onIonChange={(e) => {
                  setAlamatLengkap(e.detail.value!);
                }}
              ></IonInput>
            </IonItem>

            {AlamatLengkapError && (
              <IonText color="danger">
                <p className="ion-padding-start">Alamat Lengkap is required</p>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked" color="primary">
                Alamat Sekolah
              </IonLabel>
              <IonInput
                type="text"
                value={AlamatSekolah}
                onIonChange={(e) => {
                  setAlamatSekolah(e.detail.value!);
                }}
              ></IonInput>
            </IonItem>

            {AlamatSekolahError && (
              <IonText color="danger">
                <p className="ion-padding-start">Alamat Sekolah is required</p>
              </IonText>
            )}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block" disabled={base.loading.isOpen}>
                {base.loading.isOpen ? "Menunggu..." : "Daftar"}
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton
                routerLink="/"
                color="light"
                expand="block"
                disabled={base.loading.isOpen}
              >
                Kembali Ke Beranda
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                routerLink="/login"
                color="light"
                expand="block"
                disabled={base.loading.isOpen}
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

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    base:state.base
  }),
  mapDispatchToProps: {
    setSignUp,
  },
  component: Login,
});
