import axios from "../../axios-orders";

import * as actionTypes from "../actions/actionTypes";

export const addIngrediant = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIANT,
    ingrediantName: ingName,
  };
};

export const removeIngrediant = (ingName) => {
  return {
    type: actionTypes.REMOVE_INGREDIANT,
    ingrediantName: ingName,
  };
};

export const fetchIngrediantsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIANTS_FAILED,
  };
};

export const setIngrediants = (ingrediants) => {
  return {
    type: actionTypes.SET_INGREDIANTS,
    ingrediants: ingrediants,
  };
};

export const initIngrediants = () => {
  return (dispatch) => {
    axios
      .get("https://react-my-burger-stark.firebaseio.com/ingrediants.json")
      .then((response) => {
        dispatch(setIngrediants(response.data));
      })
      .catch((error) => {
        dispatch(fetchIngrediantsFailed());
      });
  };
};
