import { CameraResultType, Plugins } from "@capacitor/core";
import {
  IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonText, IonTitle, IonToolbar, useIonViewDidEnter
} from "@ionic/react";
import { checkmark } from "ionicons/icons";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import { BaseUrl } from "../AppConfig";
import { setAuthData } from "../data/base/base.actions";
import { connect } from "../data/connect";
import { AuthData } from "../models/Base";
import "./Account.scss";
const Camera = Plugins.Camera;
// const CRT = CameraResultType.Uri;
interface OwnProps extends RouteComponentProps {}

interface StateProps {
  authData: AuthData;
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
  const [ava, setAva] = useState(
    (authData && authData.photo) ||
      "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
  );
  // useIonViewDidEnter(() => {
  //   if (!authData) {
  //     // setAuthData(undefined);
  //     history.replace("/tabs/portal");
  //   } else {
  //     const BodyData = new FormData();
  //     BodyData.append("token", authData.token || "");
  //     fetch(BaseUrl+"page/profile", {
  //       method: "POST",
  //       body: BodyData,
  //     })
  //       .then((res) => {
  //         if (!res.ok) {
  //           throw new Error("Server Bermasalah");
  //         }
  //         return res.json();
  //       })
  //       .then((res) => {
  //         if (res.result && res.result.gid) {
  //           setProfileData(res.result);
  //         } else {
  //           setProfileData(null);
  //         }
  //       })
  //       .catch((err) => {
  //         alert(err);
  //       });
  //   }
  // });
  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      width: 300,
      height: 300,
      resultType: CameraResultType.Base64,
    });
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
            <IonList lines="none" class="bg-gray">
              <IonItem class="bg-gray">
                <IonLabel position="stacked">E-Mail</IonLabel>
                <IonInput disabled value={authData.email || "-"}></IonInput>
              </IonItem>
              <IonItem class="bg-gray">
                <IonLabel position="stacked">First Name</IonLabel>
                <IonInput disabled value={authData.first_name || "-"}></IonInput>
              </IonItem>
              <IonItem class="bg-gray">
                <IonLabel position="stacked">Last Name</IonLabel>
                <IonInput disabled value={authData.last_name || "-"}></IonInput>
              </IonItem>
              <IonItem class="bg-gray">
                <IonLabel position="stacked">Kontak</IonLabel>
                <IonInput  disabled value={authData.contact_no || "-"}></IonInput>
              </IonItem>
              <IonItem class="bg-gray">
                <IonLabel position="stacked">Alamat Lengkap</IonLabel>
                <IonInput disabled value={authData.alamat_lengkap || "-"}></IonInput>
              </IonItem>
              <IonItem class="bg-gray">
                <IonLabel position="stacked">Alamat Sekolah</IonLabel>
                <IonInput disabled value={authData.alamat_sekolah || "-"}></IonInput>
              </IonItem>
            </IonList>
            <IonButton color="primary" size="large" className="ion-margin" hidden>
              <IonIcon icon={checkmark}></IonIcon>&nbsp; Simpan Perubahan
            </IonButton>
            <br />
            <IonText
              onClick={() => {
                setAuthData(undefined);
                setTimeout(() => {
                  window.location.href="/";
                }, 500);
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
    authData: state.base.authData,
  }),
  mapDispatchToProps: {
    setAuthData,
  },
  component: Account,
});
