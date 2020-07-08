import React, { Component } from "react";

import { connect } from "react-redux";

import classes from "./Layout.css";

import Aux from "../../hoc/Auxillary";

import Toolbar from "../Navigation/Toolbar/Toolbar";

import Sidedrawer from "../Navigation/Sidedrawer/Sidedrawer";

class Layout extends Component {
  state = {
    showSidedrawer: false,
  };

  sidedrawerClosedHandler = () => {
    this.setState({ showSidedrawer: false });
  };

  sidedrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSidedrawer: !prevState.showSidedrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.sidedrawerToggleHandler}
        />
        <Sidedrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSidedrawer}
          closed={this.sidedrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToToProps)(Layout);
