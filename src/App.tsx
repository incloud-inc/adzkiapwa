import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import {
  IonAlert,
  IonApp,
  IonLoading,
  IonRouterOutlet,
  IonSplitPane,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/adzkia.css";
import MainTabs from "./pages/MainTabs";
import { connect } from "./data/connect";
import { AppContextProvider } from "./data/AppContext";
import { loadConfData } from "./data/sessions/sessions.actions";
import { loadUserData } from "./data/user/user.actions";
import Package from "./pages/Package";
import Account from "./pages/Account";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Signup from "./pages/Signup";
import Support from "./pages/Support";
import Tutorial from "./pages/Tutorial";
import Quiz from "./pages/quiz/Quiz";
import Result from "./pages/quiz/Result";
import GroupDetail from "./pages/Group/GroupDetail";
import GroupPurchase from "./pages/Group/GroupPurchase";
import GroupPurchaseComplete from "./pages/Group/GroupPurchaseComplete";
import HomeOrTutorial from "./components/HomeOrTutorial";
import { Schedule } from "./models/Schedule";
import RedirectToLogin from "./components/RedirectToLogin";

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
  );
};

interface StateProps {
  darkMode: boolean;
  loading: boolean;
  authData?: any;
  alert: any;
}

interface DispatchProps {
  loadConfData: typeof loadConfData;
  loadUserData: typeof loadUserData;
}

interface IonicAppProps extends StateProps, DispatchProps {}

const IonicApp: React.FC<IonicAppProps> = ({
  darkMode,
  loading,
  alert,
  authData,
  loadConfData,
  loadUserData,
}) => {
  useEffect(() => {
    loadUserData();
  }, []);
  return (
    <IonApp className={`${darkMode ? "dark-theme" : ""}`} class="md">
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <IonLoading isOpen={loading}></IonLoading>
          <IonAlert
            isOpen={alert.isOpen}
            header={alert.header}
            subHeader={alert.subHeader}
            message={alert.message}
          ></IonAlert>
          <IonRouterOutlet id="main">
            {/*
              We use IonRoute here to keep the tabs state intact,
              which makes transitions between tabs and non tab pages smooth
              */}
            <Route path="/tabs" render={() => <MainTabs />} />
            <Route path="/package" component={Package} />
            <Route path="/account" component={Account} />
            <Route path="/login" component={Login} />
            <Route path="/forgotpassword" component={ForgotPassword} />
            <Route path="/signup" component={Signup} />
            <Route path="/support" component={Support} />
            <Route path="/tutorial" component={Tutorial} />
            <Route path="/group/detail/:id" component={GroupDetail} />
            <Route path="/group/purchase/:id" component={GroupPurchase} />
            <Route
              path="/group/purchasecomplete/:id"
              component={GroupPurchaseComplete}
            />
            <Route path="/quiz/start/:quid" exact component={Quiz} />
            <Route path="/quiz/result/:rid" component={Result} />
            {/* <Route
            path="/logout"
            render={() => {
              return (
                <RedirectToLogin
                  setIsLoggedIn={setIsLoggedIn}
                  setUsername={setUsername}
                />
              );
            }}
          /> */}
            <Route path="/" component={HomeOrTutorial} exact />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    authData: state.data.authData,
    loading: state.user.loading,
    alert: state.user.alert,
  }),
  mapDispatchToProps: {
    loadConfData,
    loadUserData,
  },
  component: IonicApp,
});
