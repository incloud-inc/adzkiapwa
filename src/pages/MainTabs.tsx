import React from "react";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { Route, Redirect } from "react-router";
import {
  calendar,
  location,
  informationCircle,
  people,
  home,
  grid,
  pieChart,
  settings,
} from "ionicons/icons";
import SchedulePage from "./SchedulePage";
import SpeakerList from "./SpeakerList";
import SpeakerDetail from "./SpeakerDetail";
import SessionDetail from "./SessionDetail";
import Portal from "./Portal";
import MapView from "./MapView";
import About from "./About";

interface MainTabsProps {}

const MainTabs: React.FC<MainTabsProps> = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/portal" />
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route
          path="/tabs/schedule"
          render={() => <SchedulePage />}
          exact={true}
        />
        <Route
          path="/tabs/speakers"
          render={() => <SpeakerList />}
          exact={true}
        />
        <Route
          path="/tabs/speakers/:id"
          component={SpeakerDetail}
          exact={true}
        />
        <Route path="/tabs/portal/" component={Portal} />
        <Route path="/tabs/speakers/sessions/:id" component={SessionDetail} />
        <Route path="/tabs/map" render={() => <About />} exact={true} />
        <Route path="/tabs/about" render={() => <About />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" class="maintab">
        <IonTabButton tab="portal" href="/tabs/portal">
          <IonIcon icon={home} />
        </IonTabButton>
        <IonTabButton tab="speakers" href="/tabs/speakers">
          <IonIcon icon={grid} />
        </IonTabButton>
        <IonTabButton tab="map" href="/tabs/map">
          <IonIcon icon={pieChart} />
        </IonTabButton>
        <IonTabButton tab="about" href="/tabs/about">
          <IonIcon icon={settings} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
