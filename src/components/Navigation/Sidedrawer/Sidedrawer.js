import React from "react";

import Logo from "../../Logo/Logo";

import NavigationItems from "../NavigationItems/NavigationItems";

import BackDrop from "../../UI/Backdrop/Backdrop";

import Aux from "../../../hoc/Auxillary";

import classes from "./Sidedrawer.css";

const sidedrawer = (props) => {
  let attachedClasses = [classes.Sidedrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.Sidedrawer, classes.Open];
  }

  return (
    <Aux>
      <BackDrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sidedrawer;
