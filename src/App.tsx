import {
  IonAlert,
  IonApp,
  IonLoading,
  IonRouterOutlet,
  IonSplitPane
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React, { useEffect } from "react";
import { Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import HomeOrTutorial from "./components/HomeOrTutorial";
import { AppContextProvider } from "./data/AppContext";
import { loadUserData, setAlert } from "./data/base/base.actions";
import { BaseState } from "./data/base/base.state";
import { connect } from "./data/connect";
import { loadConfData } from "./data/sessions/sessions.actions";
import Account from "./pages/Account";
import ForgotPassword from "./pages/ForgotPassword";
import Detail from "./pages/Group/GroupDetail";
import GroupPurchase from "./pages/Group/GroupPurchase";
import GroupPurchaseComplete from "./pages/Group/GroupPurchaseComplete";
import Login from "./pages/Login";
import MainTabs from "./pages/MainTabs";
import Package from "./pages/Package";
import Quiz from "./pages/quiz/Quiz";
import Result from "./pages/quiz/Result";
import Signup from "./pages/Signup";
import Support from "./pages/Support";
import Tutorial from "./pages/Tutorial";
import "./theme/adzkia.css";
import "./theme/variables.css";
const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
  );
};

interface StateProps {
  authData?: any;
  // user:BaseState;
  base:BaseState
}

interface DispatchProps {
  loadConfData: typeof loadConfData;
  loadUserData: typeof loadUserData;
  setAlert: typeof setAlert;
}

interface IonicAppProps extends StateProps, DispatchProps {}

const IonicApp: React.FC<IonicAppProps> = ({
  authData,
  // user,
  base,
  loadUserData,
  setAlert
}) => {
  useEffect(() => {
    loadUserData();    
  }, []);
  return (
    
    <IonApp class="md">
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <IonLoading
            {...base.loading}
          /> 
          <IonAlert
            {...base.alert}
            
            // onDidDismiss={() => setAlert({
            //   isOpen:false,
            //   header:'',
            //   message:'',
            //   subHeader:''
            // })}
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
            <Route path="/group/detail/:id" component={Detail} />
            <Route path="/group/purchase/:gid/:pid" component={GroupPurchase} />
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
    // user: state.base,
    base: state.base,
    authData: state.data.authData,
  }),
  mapDispatchToProps: {
    loadConfData,
    loadUserData,
    setAlert
  },
  component: IonicApp,
});
