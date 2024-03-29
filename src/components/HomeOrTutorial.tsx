import React from "react";
import { connect } from "../data/connect";
import { Redirect } from "react-router";

interface StateProps {
  hasSeenTutorial: boolean;
}

const HomeOrTutorial: React.FC<StateProps> = ({ hasSeenTutorial }) => {
  let hst = localStorage._cap_hasSeenTutorial || "false";
  hst = hst === "true" ? true : false;
  return hst ? <Redirect to="/tabs/portal" /> : <Redirect to="/tutorial" />;
};

export default connect<{}, StateProps, {}>({
  // mapStateToProps: (state) => ({
  //   hasSeenTutorial: state.base.hasSeenTutorial,
  // }),
  component: HomeOrTutorial,
});
