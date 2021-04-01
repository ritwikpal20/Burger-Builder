import { useState, useEffect } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import classes from "./BurgerBuilder.module.css";

export const BurgerBuilder = (props) => {
    const [purchasing, setPurchasing] = useState(false);
    const { onInitIngredients, onSetAuthRedirectPath } = props;

    const updatePurchaseState = (ingredients) => {
        let sum = 0;
        for (let ingredient in ingredients) {
            sum = sum + ingredients[ingredient];
        }
        return sum > 0;
    };

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true);
        } else {
            if (props.building) {
                props.onSetAuthRedirectPath("/checkout");
            } else {
                props.onSetAuthRedirectPath("/");
            }
            props.history.push("/auth");
        }
    };
    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };
    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push("/checkout");
    };

    useEffect(() => {
        onInitIngredients();
        onSetAuthRedirectPath("/");
    }, [onInitIngredients, onSetAuthRedirectPath]);

    const disabledInfo = { ...props.ings };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
    if (props.ings) {
        burger = (
            <div className={classes.BurgerBuilder}>
                <Burger ingredients={props.ings} />
                <BuildControls
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={props.price}
                    purchasable={updatePurchaseState(props.ings)}
                    ordered={purchaseHandler}
                />
            </div>
        );
        orderSummary = (
            <OrderSummary
                price={props.price}
                ingredients={props.ings}
                purchaseCanceled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
            />
        );
    }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
};

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) =>
            dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) =>
            dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) =>
            dispatch(actions.setAuthRedirectPath(path)),
    };
};

// we can wrap as many HOC to components , since we pass {...  props} in wEH to BB
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
