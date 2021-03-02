import { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICE = {
    salad: 20.5,
    meat: 50.75,
    bacon: 70.255,
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
        purchasable: false,
        purchasing: false,
    };

    updatePurchaseState() {
        // state was immediately updated after using aIH or rIH method , using setState this way we ensure we get updated state
        this.setState((prevState, props) => {
            let sum = 0;
            const ingredients = { ...prevState.ingredients };
            for (let ingredient in ingredients) {
                sum = sum + ingredients[ingredient];
            }
            return {
                purchasable: sum > 0,
            };
        });
    }

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
        this.updatePurchaseState();
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
        this.updatePurchaseState();
    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <div
                    style={
                        this.state.purchasing ? { filter: "blur(2px)" } : null
                    }
                >
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </div>
            </Aux>
        );
    }
}

export default BurgerBuilder;
