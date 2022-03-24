import {
  IonAlert,
  IonBadge,
  IonCard,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonText,
  useIonViewDidEnter,
} from "@ionic/react";
import { star } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import GeneralSkeleton from "../Shared/GeneralSkeleton";
interface OwnProps {
  authData: any;
}
let timers = 0;
console.log(timers);

setInterval(() => {
  timers++;
}, 1);
interface GroupListProps extends RouteComponentProps, OwnProps {}
const GroupList: React.FC<GroupListProps> = ({ history, authData }) => {
  const [GroupList, setGroupList] = useState<any>(undefined);
  const [showAlert, setShowAlert] = useState(false);
  const [gid, setGid] = useState(null);
  // useIonViewDidEnter(() => {
  //   setTimeout(() => {
  //     fetchGroup();
  //   }, 5000);
  // });
  useEffect(() => {
    if (authData !== undefined) {
      fetchGroup();
    }
  }, [authData]);
  const fetchGroup = () => {
    const BodyData = new FormData();
    setGroupList(undefined);

    if (authData) {
      BodyData.append("token", authData && authData.token);
    }
    fetch(
      authData
        ? "https://api3.adzkia.id/group/list"
        : "https://api3.adzkia.id/grouppublic/list",
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
        if (res.result && res.result.length > 0) {
          setGroupList(res.result);
        } else {
          setGroupList(null);
        }
      })
      .catch((err) => {
        alert(err);
        setGroupList(null);
      });
  };
  const SelectGroup = (item: any) => {
    if (item.gid) {
      if (authData) {
        history.push("/group/detail/" + item.gid);
      } else {
        if (item.price && item.price === "0") {
          setGid(item.gid);
          setShowAlert(true);
        } else {
          alert("Paket Tidak Gratis");
        }
      }
    } else {
      alert("Paket Tidak Tersedia");
    }
  };
  if (GroupList) {
    return (
      <div>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Perhatian"}
          message={
            "Anda belum terdaftar di platform adzkia, anda tetap bisa mencoba tryout gratis namun tida dapat melihat hasilnya"
          }
          buttons={[
            {
              text: "Batal",
              role: "cancel",
              cssClass: "secondary",
              // handler: () => {
              //   console.log('Confirm Cancel');
              // }
            },
            {
              text: "Ok",
              handler: () => {
                history.push("/group/detail/" + gid);
              },
            },
          ]}
        />
        {GroupList.map((item: any, index: React.Key | undefined) => (
          <IonCard
            onClick={() => {
              SelectGroup(item);
            }}
            key={index}
            className={` ${
              item.description ? "card-light " : ""
            }br-16 ion-p-8 ion-margin-bottom  ion-margin-bottom no-shadow`}
          >
            <IonGrid>
              <IonRow class="ion-align-items-center">
                {" "}
                <IonCol size="2">
                  <IonBadge color="primary" className="ion-p-8 br-8">
                    <IonIcon icon={star} color="light"></IonIcon>
                  </IonBadge>
                </IonCol>
                <IonCol size="6">
                  <h5 className="ion-no-margin color-navy">
                    <b>{item.group_name || ""}</b>
                  </h5>
                </IonCol>
                <IonCol size="4" className="ion-text-right">
                  <h5 className="ion-no-margin color-navy">
                    <b>{item.price !== "0" ? "Rp " + item.price : "GRATIS"}</b>
                  </h5>
                </IonCol>
              </IonRow>
              <IonRow
                className="ion-padding-top ion-padding-bottom"
                hidden={!item.description}
              >
                <IonCol>
                  <div
                    dangerouslySetInnerHTML={{ __html: item.description || "" }}
                  ></div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
        ))}
      </div>
    );
  } else if (GroupList === null) {
    return (
      <div className="ion-text-center">
        <IonText>Data Tidak ditemukan</IonText>
      </div>
    );
  } else {
    return <GeneralSkeleton></GeneralSkeleton>;
  }
};

export default withRouter(GroupList);
