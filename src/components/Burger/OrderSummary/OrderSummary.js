import React from "react";

import Aux from "../../../hoc/Auxillary";

import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingrediantSummary = Object.keys(props.ingrediants).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span> :{" "}
        {props.ingrediants[igKey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A Delicious Burger With The Following Ingrediants</p>
      <ul>{ingrediantSummary}</ul>
      <p>
        <strong>Total Price : {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue To Checkout...</p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
