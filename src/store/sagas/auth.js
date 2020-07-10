import axios from "axios";

import { put } from "redux-saga/effects";

import { delay } from "redux-saga";

import * as actionTypes from "../index";

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(actionTypes.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationDate * 1000);
  yield put(actionTypes.logout());
}

export function* authUserSaga(action) {
  yield put(actionTypes.authStart());

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDaevdfUd8nCGAWiArYjB1dM4HDJlIRtJU";

  if (!action.isSignup) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDaevdfUd8nCGAWiArYjB1dM4HDJlIRtJU";
  }

  try {
    const response = yield axios.post(url, authData);

    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(
      actionTypes.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actionTypes.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actionTypes.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actionTypes.logout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem("expirationDate")
    );
    if (expirationDate <= new Date()) {
      yield put(actionTypes.logout());
    } else {
      const userId = yield localStorage.getItem("userId");
      yield put(actionTypes.authSuccess(token, userId));
      yield put(
        actionTypes.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}
