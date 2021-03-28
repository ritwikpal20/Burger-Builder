import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "../../axios-orders";

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post(
            "/orders.json?auth=" + action.token,
            action.orderData
        );
        yield put(
            actions.purchaseBurgerSuccess(response.data.name, action.orderData)
        );
    } catch (err) {
        yield put(actions.purchaseBurgerFail(err));
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());

    try {
        const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
        const response = yield axios.get("/orders.json" + queryParams);
        let fetchedOrders = [];
        for (let orderId in response.data) {
            fetchedOrders.push({
                ...response.data[orderId],
                id: orderId,
            });
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders));
    } catch (err) {
        yield put(actions.fetchOrdersFail(err));
    }
}
