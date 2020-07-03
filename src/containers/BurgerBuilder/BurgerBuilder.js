import React, { Component } from "react";

import Aux from "../../hoc/Auxillary";

import Burger from "../../components/Burger/Burger";

import BuildControls from "../../components/Burger/BuildControls/BuildControls";

import Modal from "../../components/UI/Modal/Modal";

import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

import Spinner from "../../components/UI/Spinner/Spinner";

import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from "../../axios-orders";

const INGREDIANT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingrediants: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("https://react-my-burger-stark.firebaseio.com/ingrediants.json")
      .then((response) => {
        this.setState({ ingrediants: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  updatePurchaseState = (ingrediants) => {
    const sum = Object.keys(ingrediants)
      .map((igkey) => {
        return ingrediants[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };

  addIngrediantHandler = (type) => {
    const oldCount = this.state.ingrediants[type];
    const updatedCount = oldCount + 1;
    const updatedIngrediants = { ...this.state.ingrediants };
    updatedIngrediants[type] = updatedCount;
    const priceAddition = INGREDIANT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingrediants: updatedIngrediants });
    this.updatePurchaseState(updatedIngrediants);
  };

  removeIngrediantHandler = (type) => {
    const oldCount = this.state.ingrediants[type];
    if (oldCount <= 0) return;
    const updatedCount = oldCount - 1;
    const updatedIngrediants = { ...this.state.ingrediants };
    updatedIngrediants[type] = updatedCount;
    const priceDeduction = INGREDIANT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingrediants: updatedIngrediants });
    this.updatePurchaseState(updatedIngrediants);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingrediants) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingrediants[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    const disabledInfo = { ...this.state.ingrediants };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingrediant cant be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingrediants) {
      burger = (
        <Aux>
          <Burger ingrediants={this.state.ingrediants} />
          <BuildControls
            ingrediantAdded={this.addIngrediantHandler}
            ingrediantRemoved={this.removeIngrediantHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingrediants={this.state.ingrediants}
          price={this.state.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);
