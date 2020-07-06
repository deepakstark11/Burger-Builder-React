import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingrediants: null,
  totalPrice: 4,
  error: false,
};

const INGREDIANT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIANT:
      const updatedIngrediant = {
        [action.ingrediantName]: state.ingrediants[action.ingrediantName] + 1,
      };
      const updatedIngrediants = updateObject(
        state.ingrediants,
        updatedIngrediant
      );
      const updatedState = {
        ingrediants: updatedIngrediants,
        totalPrice: state.totalPrice + INGREDIANT_PRICES[action.ingrediantName],
      };
      return updateObject(state, updatedState);

    case actionTypes.REMOVE_INGREDIANT:
      const updatedIng = {
        [action.ingrediantName]: state.ingrediants[action.ingrediantName] - 1,
      };
      const updatedIngs = updateObject(state.ingrediants, updatedIng);
      const updatedSta = {
        ingrediants: updatedIngs,
        totalPrice: state.totalPrice - INGREDIANT_PRICES[action.ingrediantName],
      };
      return updateObject(state, updatedSta);

    case actionTypes.SET_INGREDIANTS:
      return updateObject(state, {
        ingrediants: {
          salad: action.ingrediants.salad,
          bacon: action.ingrediants.bacon,
          cheese: action.ingrediants.cheese,
          meat: action.ingrediants.meat,
        },
        totalPrice: 4,
        error: false,
      });

    case actionTypes.FETCH_INGREDIANTS_FAILED:
      return updateObject(state, { error: true });

    default:
      return state;
  }
};

export default reducer;
