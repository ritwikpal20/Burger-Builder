import { put, delay } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "axios";

export function* logoutSaga(action) {
    yield localStorage.removeItem("token");
    yield localStorage.removeItem("expirationDate");
    yield localStorage.removeItem("userId");
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(Number(action.expirationTime) * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true,
    };
    let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBYtgYiuN8UJ9nRagkPKxY_wgAuFvOAwqc";
    if (!action.isSignup) {
        url =
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBYtgYiuN8UJ9nRagkPKxY_wgAuFvOAwqc";
    }
    try {
        const response = yield axios.post(url, authData);
        const expirationDate = new Date(
            new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        yield put(
            actions.authSuccess(response.data.idToken, response.data.localId)
        );
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch (err) {
        if (err.response) {
            yield put(actions.authFail(err.response.data.error));
        } else {
            yield put(actions.authFail(err));
        }
    }
}

export function* authCheckStateSaga() {
    const token = yield localStorage.getItem("token");
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(
            localStorage.getItem("expirationDate")
        );
        if (expirationDate > new Date()) {
            const userId = yield localStorage.getItem("userId");
            yield put(actions.authSuccess(token, userId));
            yield put(
                actions.checkAuthTimeout(
                    (expirationDate.getTime() - new Date().getTime()) / 1000
                )
            );
        } else {
            yield put(actions.logout());
        }
    }
}
