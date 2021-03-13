import { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 0,
            meat: 0,
            bacon: 0,
            cheese: 0,
        },
        totalPrice: 0,
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
        let price;
        for (const [key, value] of queryParams) {
            if (key === "price") {
                price = Number(value);
            } else {
                ingredients[key] = Number(value);
            }
        }
        this.setState({ ingredients: ingredients, totalPrice: price });
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route
                    path={this.props.match.url + "/contact-data"}
                    render={(props) => (
                        <ContactData
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
                            {...props}
                        />
                    )}
                />
            </div>
        );
    }
}

export default Checkout;
