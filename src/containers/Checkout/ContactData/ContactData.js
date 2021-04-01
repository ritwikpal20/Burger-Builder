import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { checkValidity } from "../../../shared/utility";

const ContactData = (props) => {
    const [orderForm, setOrderForm] = useState({
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
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = (event) => {
        // stop reloading the page after submitting the from
        event.preventDefault();

        let formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] =
                orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId,
        };
        props.onOrderBurger(order, props.token);
    };

    const inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value, " ", inputIdentifier);

        // Since in nested object , spread syntax doesn't perform deep clone , therefore, we need to use spread syntax until we reach the key we need to change.
        let updatedOrderForm = { ...orderForm };
        let updatedOrderFormElement = {
            ...updatedOrderForm[inputIdentifier],
        };
        updatedOrderFormElement.value = event.target.value;
        [
            updatedOrderFormElement.valid,
            updatedOrderFormElement.errorMessage,
        ] = checkValidity(
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
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    };

    let form = <Spinner />;
    if (!props.loading) {
        const formElementsArray = [];
        for (let key in orderForm) {
            formElementsArray.push({
                id: key,
                config: orderForm[key],
            });
        }

        form = (
            <form onSubmit={orderHandler}>
                {formElementsArray.map((formElement) => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        errorMessage={formElement.config.errorMessage.join(" ")}
                        changed={(event) =>
                            inputChangedHandler(event, formElement.id)
                        }
                    />
                ))}
                <br />
                <Button btnType="Success" disabled={!formIsValid}>
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
};

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData, token) =>
            dispatch(actions.purchaseBurger(orderData, token)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(ContactData, axios));
