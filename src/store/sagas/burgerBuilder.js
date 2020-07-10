import { put } from "redux-saga/effects";

import axios from "../../axios-orders";

import * as actionTypes from "../index";

export function* initIngrediantSaga(action) {
  try {
    const response = yield axios.get(
      "https://react-my-burger-stark.firebaseio.com/ingrediants.json"
    );
    yield put(actionTypes.setIngrediants(response.data));
  } catch (err) {
    yield put(actionTypes.fetchIngrediantsFailed());
  }
}
