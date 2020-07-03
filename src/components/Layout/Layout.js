import React, { Component } from "react";

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
        <Toolbar drawerToggleClicked={this.sidedrawerToggleHandler} />
        <Sidedrawer
          open={this.state.showSidedrawer}
          closed={this.sidedrawerClosedHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
export default Layout;
