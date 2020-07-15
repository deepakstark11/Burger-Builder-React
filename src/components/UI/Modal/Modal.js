import React from "react";

import Aux from "../../../hoc/Auxillary";

import Backdrop from "../Backdrop/Backdrop";

import classes from "./Modal.css";

const modal = (props) => {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     nextProps.show !== props.show ||
  //     nextProps.children !== props.children
  //   );
  // }

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed}></Backdrop>
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default React.memo(
  modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
