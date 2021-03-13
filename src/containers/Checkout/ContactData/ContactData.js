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
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },

            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Street Name",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "ZIP CODE",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6,
                },
                valid: false,
                touched: false,
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Country",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your Mail",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
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
                valid: true,
                validation: {},
                value: "cheapest",
            },
        },
        loading: false,
        formIsValid: false,
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
        updatedOrderFormElement.valid = this.checkValidity(
            event.target.value,
            updatedOrderFormElement.validation
        );
        updatedOrderFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedOrderFormElement;

        let formIsValid = true;
        for (let formElementIdentifier in updatedOrderForm) {
            formIsValid =
                updatedOrderForm[formElementIdentifier].valid && formIsValid;
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid,
        });
    };

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

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
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) =>
                                this.inputChangedHandler(event, formElement.id)
                            }
                        />
                    ))}
                    <br />
                    <Button
                        btnType="Success"
                        disabled={!this.state.formIsValid}
                    >
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
