import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "../actions/actionTypes";

import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from "../sagas/auth";

import { initIngrediantSaga } from "../sagas/burgerBuilder";

import { purchaseBurgerSaga, fetchOrdersSaga } from "../sagas/order";

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIME, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIANTS, initIngrediantSaga);
}

export function* watchOrder() {
  yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}
