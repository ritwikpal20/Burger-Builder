import { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            bacon: 0,
            cheese: 0,
        },
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    };

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    componentDidMount() {
        let queryParams = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        for (const [key, value] of queryParams) {
            ingredients[key] = Number(value);
        }
        this.setState({ ingredients: ingredients });
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
            </div>
        );
    }
}

export default Checkout;
