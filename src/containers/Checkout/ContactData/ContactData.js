import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: "",
        },
        loading: false,
    };

    // componentDidMount() {}

    orderHandler = (event) => {
        // stop reloading the page after submitting the from
        event.preventDefault();

        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                this.setState({ loading: false });
                this.props.history.push("/");
            })
            .catch((err) => {
                this.setState({ loading: false });
            });
    };

    render() {
        let form = <Spinner />;
        if (!this.state.loading) {
            form = (
                <form>
                    <input
                        className={classes.Input}
                        type="text"
                        name="name"
                        placeholder="Your Name"
                    />
                    <input
                        className={classes.Input}
                        type="email"
                        name="email"
                        placeholder="Your Mail"
                    />
                    <input
                        className={classes.Input}
                        type="text"
                        name="street"
                        placeholder="Street Name"
                    />
                    <input
                        className={classes.Input}
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                    />
                    <br />
                    <Button btnType="Success" clicked={this.orderHandler}>
                        ORDER
                    </Button>
                </form>
            );
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
