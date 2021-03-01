import { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICE = {
    salad: 20,
    meat: 50,
    bacon: 70,
    cheese: 15,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            bacon: 0,
            cheese: 0,
        },
        totalPrice: 50,
    };

    addIngredientHandler = (type) => {
        // get a copy of old ingredients and modify it , and then set old state to this new one
        const oldIngredients = { ...this.state.ingredients };
        const newIngredients = { ...oldIngredients };
        newIngredients[type] = newIngredients[type] + 1;

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENT_PRICE[type];

        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice,
        });
    };

    removeIngredientHandler = (type) => {
        // get a copy of old ingredients and modify it , and then set old state to this new one
        const oldIngredients = { ...this.state.ingredients };
        const newIngredients = { ...oldIngredients };
        const oldCount = oldIngredients[type];
        if (oldCount <= 0) {
            return;
        }
        newIngredients[type] = newIngredients[type] - 1;

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - INGREDIENT_PRICE[type];

        this.setState({
            ingredients: newIngredients,
            totalPrice: newPrice,
        });
    };

    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;
