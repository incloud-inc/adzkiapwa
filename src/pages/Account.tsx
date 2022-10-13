import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonList,
  IonItem,
  IonAlert,
  IonBackButton,
  useIonViewDidEnter,
  IonButton,
  IonIcon,
  IonText,
  IonLabel,
  IonInput,
} from "@ionic/react";
import "./Account.scss";
import { setAuthData } from "../data/user/user.actions";
import { connect } from "../data/connect";
import { RouteComponentProps } from "react-router";
import { checkmark, logOut, save } from "ionicons/icons";
import { CameraResultType, Plugins } from "@capacitor/core";
import { BaseUrl } from "../AppConfig";
const Camera = Plugins.Camera;
// const CRT = CameraResultType.Uri;
interface OwnProps extends RouteComponentProps {}

interface StateProps {
  authData: any;
}

interface DispatchProps {
  setAuthData: typeof setAuthData;
}

interface AccountProps extends OwnProps, StateProps, DispatchProps {}

const Account: React.FC<AccountProps> = ({
  setAuthData,
  authData,
  history,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [ProfileData, setProfileData] = useState<any>(undefined);
  const [ava, setAva] = useState(
    (authData && authData.photo) ||
      "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
  );
  useIonViewDidEnter(() => {
    if (!authData) {
      setAuthData(undefined);
      history.replace("/tabs/portal");
    } else {
      const BodyData = new FormData();
      BodyData.append("token", authData.token || "");
      fetch(BaseUrl+"page/profile", {
        method: "POST",
        body: BodyData,
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Server Bermasalah");
          }
          return res.json();
        })
        .then((res) => {
          if (res.result && res.result.gid) {
            setProfileData(res.result);
          } else {
            setProfileData(null);
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  });
  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      width: 300,
      height: 300,
      resultType: CameraResultType.Base64,
    });
    console.log(image);

    setAva("data:image/png;base64, " + image.base64String);
  };
  return (
    <IonPage id="account-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/portal"></IonBackButton>
          </IonButtons>
          <IonTitle>Profil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="bg-gray">
        {authData && (
          <div className="ion-padding-top ion-text-center">
            <img
              src={ava}
              width="100px"
              height="100px"
              style={{ objectFit: "cover" }}
            />
            <br />
            <IonText color="primary" onClick={takePicture}>
              Ganti Foto
            </IonText>
            <h2>
              {authData.first_name || ""} {authData.last_name || ""}
            </h2>
            <IonList lines="none">
              <IonItem>
                <IonLabel position="stacked">E-Mail</IonLabel>
                <IonInput disabled value={authData.email || ""}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">First Name</IonLabel>
                <IonInput value={authData.first_name || ""}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Kontak</IonLabel>
                <IonInput value={authData.contact_no || ""}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Alamat Lengkap</IonLabel>
                <IonInput value={authData.username || ""}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Alamat Sekolah</IonLabel>
                <IonInput value={authData.username || ""}></IonInput>
              </IonItem>
            </IonList>
            <IonButton color="primary" size="large" className="ion-margin">
              <IonIcon icon={checkmark}></IonIcon>&nbsp; Simpan Perubahan
            </IonButton>
            <br />
            <IonText
              onClick={() => {
                setAuthData(undefined);
                history.replace("/");
              }}
              color="danger"
            >
              Keluar
            </IonText>
            <br />
            <br />
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    authData: state.user.authData,
  }),
  mapDispatchToProps: {
    setAuthData,
  },
  component: Account,
});
