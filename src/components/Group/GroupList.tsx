import {
  IonAlert,
  IonBadge,
  IonCard,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
  IonText
} from "@ionic/react";
import { star } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "../../data/connect";
import { PostGroupList } from "../../data/quiz/quiz.actions";
import { AuthData } from "../../models/Base";
import { GroupList } from "../../models/Quiz";
import GeneralSkeleton from "../Shared/GeneralSkeleton";

interface OwnProps {
  authData?: AuthData;
}

interface StateProps {
  GroupList: GroupList[];
}

interface DispatchProps {
  PostGroupList:typeof PostGroupList
}

interface GroupListProps
  extends OwnProps,
    StateProps,
    DispatchProps,
    RouteComponentProps {}
interface GroupListProps extends RouteComponentProps, OwnProps {}
const GroupListComponent: React.FC<GroupListProps> = ({ history, authData,GroupList,PostGroupList }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [Group, setGroup] = useState<GroupList>();
  useEffect(() => {
    PostGroupList()
  }, []);
  const SelectGroup = (Group: GroupList) => {
    if(!Group.gid) {alert("Paket Tidak Tersedia"); return;}
    if(authData) {history.push("/group/detail/" + Group.gid);return;}
     // if (Group.price && Group.price !== "0") {
     //   history.push("/group/purchase/" + Group.gid +'/0');
     //   return;
     // }
    if (Group.price && Group.price !== "0") {
      history.push("/group/purchase/" + Group.gid +'/0');
      return;
    }
    setGroup(Group);
    setShowAlert(true);
  };
  if(GroupList && GroupList.length == 0) return (
    <div className="ion-text-center">
      <IonText>Data Quiz ditemukan</IonText>
    </div>
  );
  if (GroupList)
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
            },
            {
              text: "Ok",
              handler: () => {
                history.push("/group/detail/" + Group?.gid);
              },
            },
          ]}
        />
        {GroupList.map((item: GroupList, index: React.Key | undefined) => (
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
  return <GeneralSkeleton></GeneralSkeleton>;
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    GroupList: state.quiz.GroupList,
  }),
  mapDispatchToProps: {
    PostGroupList
  },
  component: withRouter(GroupListComponent),
});
