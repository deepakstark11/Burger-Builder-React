import React, { useState, useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import Aux from "../../hoc/Auxillary";

import {
  addIngrediant,
  removeIngrediant,
  initIngrediants,
  purchaseInit,
  setAuthRedirectPath,
} from "../../store/index";

import axios from "../../axios-orders";

import Burger from "../../components/Burger/Burger";

import BuildControls from "../../components/Burger/BuildControls/BuildControls";

import Modal from "../../components/UI/Modal/Modal";

import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

import Spinner from "../../components/UI/Spinner/Spinner";

import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const burgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const ings = useSelector((state) => {
    return state.burgerBuilder.ingrediants;
  });
  const price = useSelector((state) => {
    return state.burgerBuilder.totalPrice;
  });
  const error = useSelector((state) => {
    return state.burgerBuilder.error;
  });
  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });

  const onIngrediantAdded = (ingName) => dispatch(addIngrediant(ingName));
  const onIngrediantRemoved = (ingName) => dispatch(removeIngrediant(ingName));
  const onInitIngrediants = useCallback(() => dispatch(initIngrediants()), [
    dispatch,
  ]);
  const onInitPurchase = () => dispatch(purchaseInit());
  const onSetAuthRedirectPath = (path) => dispatch(setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngrediants();
  }, [onInitIngrediants]);

  const updatePurchaseState = (ingrediants) => {
    const sum = Object.keys(ingrediants)
      .map((igkey) => {
        return ingrediants[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    props.history.push("/checkout");
  };

  const disabledInfo = { ...props.ings };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;

  let burger = error ? <p>Ingrediant cant be loaded</p> : <Spinner />;

  if (ings) {
    burger = (
      <Aux>
        <Burger ingrediants={ings} />
        <BuildControls
          ingrediantAdded={onIngrediantAdded}
          ingrediantRemoved={onIngrediantRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(ings)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
          price={price}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingrediants={ings}
        price={price}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

export default WithErrorHandler(burgerBuilder, axios);
