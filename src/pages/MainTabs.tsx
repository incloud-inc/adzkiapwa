import {
  IonIcon, IonRouterOutlet,
  IonTabBar,
  IonTabButton, IonTabs
} from "@ionic/react";
import {
  grid, home, pieChart,
  settings
} from "ionicons/icons";
import React from "react";
import { Redirect, Route } from "react-router";
import About from "./About";
import Account from "./Account";
import ExamResults from "./ExamResults";
import Payments from "./Payments";
import Portal from "./Portal";
import SchedulePage from "./SchedulePage";
import SessionDetail from "./SessionDetail";
import SpeakerDetail from "./SpeakerDetail";
import SpeakerList from "./SpeakerList";

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
        <Route path="/tabs/payments/" component={Payments} />
        <Route path="/tabs/account/" component={Account} />
        <Route path="/tabs/examresults/" component={ExamResults} />
        <Route path="/tabs/speakers/sessions/:id" component={SessionDetail} />
        <Route path="/tabs/map" render={() => <About />} exact={true} />
        <Route path="/tabs/about" render={() => <About />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" class="maintab">
        <IonTabButton tab="portal" href="/tabs/portal">
          <IonIcon icon={home} />
        </IonTabButton>
        <IonTabButton tab="speakers" href="/tabs/payments">
          <IonIcon icon={grid} />
        </IonTabButton>
        <IonTabButton tab="map" href="/tabs/examresults">
          <IonIcon icon={pieChart} />
        </IonTabButton>
        <IonTabButton tab="about" href="/tabs/account">
          <IonIcon icon={settings} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
