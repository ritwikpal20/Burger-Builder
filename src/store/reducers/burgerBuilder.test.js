import reducer from "./burgerBuilder";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
    ingredients: {
        salad: 0,
        meat: 0,
        bacon: 0,
        cheese: 0,
    },
    totalPrice: 50,
    error: false,
    building: false,
};
const INGREDIENT_PRICE = {
    salad: 20.5,
    meat: 50.75,
    bacon: 70.255,
    cheese: 15,
};

describe("BurgerBuilder Reducer", () => {
    it("should add one ingredient and update price", () => {
        expect(
            reducer(initialState, {
                type: actionTypes.ADD_INGREDIENT,
                ingredientName: "salad",
            })
        ).toEqual({
            ingredients: {
                salad: 1,
                meat: 0,
                bacon: 0,
                cheese: 0,
            },
            totalPrice: 50 + INGREDIENT_PRICE.salad,
            error: false,
            building: true,
        });
    });
    it("should reduce one ingredients and update price", () => {
        initialState.ingredients.salad = 1;
        initialState.totalPrice = 50 + INGREDIENT_PRICE.salad;
        expect(
            reducer(initialState, {
                type: actionTypes.REMOVE_INGREDIENT,
                ingredientName: "salad",
            })
        ).toEqual({
            ingredients: {
                salad: 0,
                meat: 0,
                bacon: 0,
                cheese: 0,
            },
            totalPrice: 50,
            error: false,
            building: false,
        });
    });
    it("should reduce one ingredient but not set building to false if one of the ingredients is present", () => {
        initialState.ingredients.salad = 2;
        initialState.totalPrice = 50 + 2 * INGREDIENT_PRICE.salad;
        expect(
            reducer(initialState, {
                type: actionTypes.REMOVE_INGREDIENT,
                ingredientName: "salad",
            })
        ).toEqual({
            ingredients: {
                salad: 1,
                meat: 0,
                bacon: 0,
                cheese: 0,
            },
            totalPrice: 50 + INGREDIENT_PRICE.salad,
            error: false,
            building: true,
        });
    });
});
