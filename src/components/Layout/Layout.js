import React, { useState } from "react";

import { connect } from "react-redux";

import classes from "./Layout.css";

import Aux from "../../hoc/Auxillary";

import Toolbar from "../Navigation/Toolbar/Toolbar";

import Sidedrawer from "../Navigation/Sidedrawer/Sidedrawer";

const layout = (props) => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sidedrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  };

  const sidedrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sidedrawerToggleHandler}
      />
      <Sidedrawer
        isAuth={props.isAuthenticated}
        open={sideDrawerIsVisible}
        closed={sidedrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToToProps)(layout);
