import axios from "../../axios-orders";

import { put } from "redux-saga/effects";

import * as actionTypes from "../index";

export function* purchaseBurgerSaga(action) {
  yield put(actionTypes.purchaseBurgerStart());

  try {
    const response = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    );

    yield put(
      actionTypes.purchaseBurgerSuccess(response.data.name, action.orderData)
    );
  } catch (error) {
    yield put(actionTypes.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actionTypes.fetchOrdersStart());
  const queryParams =
    "?auth=" +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"';
  try {
    const response = yield axios.get("/orders.json" + queryParams);

    const fetchedOrders = [];
    for (let key in response.data) {
      fetchedOrders.push({
        ...response.data[key],
        id: key,
      });
    }
    yield put(actionTypes.fetchOrdersSuccess(fetchedOrders));
  } catch (err) {
    yield put(actionTypes.fetchOrdersFail(err));
  }
}
