import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";

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
                errorMessage: [],
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
                errorMessage: [],
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
                    number: true,
                },
                valid: false,
                touched: false,
                errorMessage: [],
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
                errorMessage: [],
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
                errorMessage: [],
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
                errorMessage: [],
            },
        },
        formIsValid: false,
    };

    // componentDidMount() {}

    orderHandler = (event) => {
        // stop reloading the page after submitting the from
        event.preventDefault();

        let formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[
                formElementIdentifier
            ].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
        };
        this.props.onOrderBurger(order);
    };

    inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value, " ", inputIdentifier);

        // Since in nested object , spread syntax doesn't perform deep clone , therefore, we need to use spread syntax until we reach the key we need to change.
        let updatedOrderForm = { ...this.state.orderForm };
        let updatedOrderFormElement = {
            ...updatedOrderForm[inputIdentifier],
        };
        updatedOrderFormElement.value = event.target.value;
        [
            updatedOrderFormElement.valid,
            updatedOrderFormElement.errorMessage,
        ] = this.checkValidity(
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
        let errorMessage = [];

        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
            if (value.trim() === "")
                errorMessage.push("Enter value in compulsory field.");
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
            if (value.length < rules.minLength)
                errorMessage.push("Min Length is " + rules.minLength + ".");
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
            if (value.length > rules.maxLength)
                errorMessage.push("Max Length is " + rules.maxLength + ".");
        }

        if (rules.number) {
            isValid = !isNaN(value) && isValid;
            if (isNaN(value)) errorMessage.push("Must be a number.");
        }

        return [isValid, errorMessage];
    }

    render() {
        let form = <Spinner />;
        if (!this.props.loading) {
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
                            errorMessage={formElement.config.errorMessage.join(
                                " "
                            )}
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

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData) =>
            dispatch(actions.purchaseBurger(orderData)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(ContactData, axios));
