import { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

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
        loading: false,
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
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };
    purchaseContinueHandler = () => {
        this.setState({ loading: true });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Ritwik Pal",
                address: {
                    street: "Kgp",
                    zipCode: 721,
                    country: "India",
                },
            },
            deliveryMethod: "fastest",
        };
        axios
            .post("/orders.json", order)
            .then((response) => {
                this.setState({ loading: false, purchasing: false });
            })
            .catch((err) => {
                this.setState({ loading: false, purchasing: false });
            });
    };

    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = (
            <OrderSummary
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />
        );
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>

                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
