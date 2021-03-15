import * as actionTypes from "./actions";

const initialState = {
    ingredients: {
        salad: 0,
        meat: 0,
        bacon: 0,
        cheese: 0,
    },
    totalPrice: 50,
};

const INGREDIENT_PRICE = {
    salad: 20.5,
    meat: 50.75,
    bacon: 70.255,
    cheese: 15,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:
                        state.ingredients[action.ingredientName] + 1,
                },
                totalPrice:
                    state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:
                        state.ingredients[action.ingredientName] - 1,
                },
                totalPrice:
                    state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
            };
        default:
            return state;
    }
};

export default reducer;
