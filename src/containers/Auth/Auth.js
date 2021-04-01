import { useState } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import { Redirect } from "react-router";
import { checkValidity } from "../../shared/utility";

const Auth = (props) => {
    const [controls, setControls] = useState({
        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                placeholder: "Your Email",
            },
            value: "",
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
            errorMessage: [],
        },
        password: {
            elementType: "input",
            elementConfig: {
                type: "password",
                placeholder: "Your Password",
            },
            value: "",
            validation: {
                required: true,
                minLength: 6,
            },
            valid: false,
            touched: false,
            errorMessage: [],
        },
    });
    const [isSignup, setIsSignup] = useState(true);
    const [formIsValid, setFormIsValid] = useState(false);

    const inputChangedHandler = (event, controlName) => {
        let updatedControls = { ...controls };
        let updatedControlsElement = {
            ...updatedControls[controlName],
        };
        updatedControlsElement.value = event.target.value;
        [
            updatedControlsElement.valid,
            updatedControlsElement.errorMessage,
        ] = checkValidity(
            event.target.value,
            updatedControlsElement.validation
        );
        updatedControlsElement.touched = true;
        updatedControls[controlName] = updatedControlsElement;

        let formIsValid = true;
        for (let formElementIdentifier in updatedControls) {
            formIsValid =
                updatedControls[formElementIdentifier].valid && formIsValid;
        }
        setControls(updatedControls);
        setFormIsValid(formIsValid);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignup);
    };

    const switchAuthModeHandler = () => {
        setIsSignup((prevState) => {
            return !prevState;
        });
    };

    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key],
        });
    }

    let form = formElementsArray.map((formElement) => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            errorMessage={formElement.config.errorMessage.join(" ")}
            changed={(event) => inputChangedHandler(event, formElement.id)}
        />
    ));

    let authForm = <Spinner />;
    if (!props.loading) {
        authForm = (
            <Aux>
                {isSignup ? <h2>Sign Up Form</h2> : <h2>Sign In Form</h2>}
                {props.error ? <p>{props.error.message}</p> : null}
                <form onSubmit={submitHandler}>
                    {form}
                    {formIsValid ? (
                        <Button btnType="Success">SUBMIT</Button>
                    ) : (
                        <Button btnType="Success" disabled>
                            SUBMIT
                        </Button>
                    )}
                </form>
                <Button btnType="Danger" clicked={switchAuthModeHandler}>
                    SWITCH TO {isSignup ? "SIGNIN" : "SIGNUP"}
                </Button>
            </Aux>
        );
    }
    if (props.isAuthenticated) {
        authForm = <Redirect to={props.authRedirectPath} />;
    }
    return <div className={classes.Auth}>{authForm}</div>;
};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token != null,
        authRedirectPath: state.auth.authRedirectPath,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) =>
            dispatch(actions.auth(email, password, isSignup)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
