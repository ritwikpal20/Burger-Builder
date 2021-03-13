import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name",
                },
                value: "",
            },

            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Street Name",
                },
                value: "",
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "ZIP CODE",
                },
                value: "",
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Country",
                },
                value: "",
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your Mail",
                },
                value: "",
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {
                            value: "cheapest",
                            displayValue: "Cheapest",
                        },
                        {
                            value: "fastest",
                            displayValue: "Fastest",
                        },
                    ],
                },
                value: "cheapest",
            },
        },
        loading: false,
    };

    // componentDidMount() {}

    orderHandler = (event) => {
        // stop reloading the page after submitting the from
        event.preventDefault();

        this.setState({ loading: true });

        let formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[
                formElementIdentifier
            ].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
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

    inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value, " ", inputIdentifier);

        // Since in nested object , spread syntax doesn't perform deep clone , therefore, we need to use spread syntax until we reach the key we need to change.
        let updatedOrderForm = { ...this.state.orderForm };
        let updatedOrderFormElement = {
            ...updatedOrderForm[inputIdentifier],
        };
        updatedOrderFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedOrderFormElement;
        this.setState({ orderForm: updatedOrderForm });
    };

    render() {
        let form = <Spinner />;
        if (!this.state.loading) {
            const formElementsArray = [];
            for (let key in this.state.orderForm) {
                formElementsArray.push({
                    id: key,
                    config: this.state.orderForm[key],
                });
            }

            form = (
                <form onSubmit={this.orderHandler}>
                    {formElementsArray.map((formElement) => (
                        <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            changed={(event) =>
                                this.inputChangedHandler(event, formElement.id)
                            }
                        />
                    ))}
                    <br />
                    <Button btnType="Success">ORDER</Button>
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
