import { Component } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false,
    };

    updatePurchaseState(ingredients) {
        let sum = 0;
        for (let ingredient in ingredients) {
            sum = sum + ingredients[ingredient];
        }
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };
    purchaseContinueHandler = () => {
        this.props.history.push("/checkout");
    };

    render() {
        const disabledInfo = { ...this.props.ings };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? (
            <p>Ingredients can't be loaded</p>
        ) : (
            <Spinner />
        );
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = (
                <OrderSummary
                    price={this.props.price}
                    ingredients={this.props.ings}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
            );
        }

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
                {burger}
            </Aux>
        );
    }

    componentDidMount() {
        // axios
        //     .get(
        //         "https://burger-builder-e56e6-default-rtdb.firebaseio.com/ingredients.json"
        //     )
        //     .then((response) => {
        //         if (response.data === undefined) {
        //             this.setState({ error: true });
        //         } else {
        //             this.setState({ ingredients: response.data });
        //         }
        //     })
        //     .catch((error) => {
        //         this.setState({ error: true });
        //     });
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) =>
            dispatch({
                type: actionTypes.ADD_INGREDIENT,
                ingredientName: ingName,
            }),
        onIngredientRemoved: (ingName) =>
            dispatch({
                type: actionTypes.REMOVE_INGREDIENT,
                ingredientName: ingName,
            }),
    };
};

// we can wrap as many HOC to components , since we pass {...this.props} in wEH to BB
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
