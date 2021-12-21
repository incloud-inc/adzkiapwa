import {
  IonAvatar,
  IonItem,
  IonLabel,
  IonList,
  IonSkeletonText,
} from "@ionic/react";
import React from "react";
const GeneralSkeleton: React.FC = () => {
  return (
    <IonList>
      {[...Array(6)].map((item, index) => (
        <IonItem key={index}>
          <IonAvatar slot="start">
            <IonSkeletonText animated />
          </IonAvatar>
          <IonLabel>
            <h3>
              <IonSkeletonText animated style={{ width: "50%" }} />
            </h3>
            <p>
              <IonSkeletonText animated style={{ width: "80%" }} />
            </p>
            <p>
              <IonSkeletonText animated style={{ width: "60%" }} />
            </p>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
};

export default GeneralSkeleton;
