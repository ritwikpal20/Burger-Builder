import axios from "../../axios-orders";
import { put } from "redux-saga/effects";
import * as actions from "../actions/index";

export function* initIngredientsSaga(action) {
    try {
        const response = yield axios.get(
            "https://burger-builder-e56e6-default-rtdb.firebaseio.com/ingredients.json"
        );
        if (response.data === undefined) {
            yield put(actions.fetchIngredientsFailed());
        } else {
            yield put(actions.setIngredients(response.data));
        }
    } catch (error) {
        yield put(actions.fetchIngredientsFailed());
    }
}
