import { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import { Redirect } from "react-router";
import { checkValidity } from "../../shared/utility";

class Auth extends Component {
    state = {
        controls: {
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
        },
        isSignup: true,
    };

    inputChangedHandler = (event, controlName) => {
        let updatedControls = { ...this.state.controls };
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
        this.setState({
            controls: updatedControls,
            formIsValid: formIsValid,
        });
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup
        );
    };

    switchAuthModeHandler = () => {
        this.setState((prevState) => {
            return {
                isSignup: !prevState.isSignup,
            };
        });
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
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
                changed={(event) =>
                    this.inputChangedHandler(event, formElement.id)
                }
            />
        ));

        let authForm = <Spinner />;
        if (!this.props.loading) {
            authForm = (
                <Aux>
                    {this.state.isSignup ? (
                        <h2>Sign Up Form</h2>
                    ) : (
                        <h2>Sign In Form</h2>
                    )}
                    {this.props.error ? (
                        <p>{this.props.error.message}</p>
                    ) : null}
                    <form onSubmit={this.submitHandler}>
                        {form}
                        <Button btnType="Success">SUBMIT</Button>
                    </form>
                    <Button
                        btnType="Danger"
                        clicked={this.switchAuthModeHandler}
                    >
                        SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
                    </Button>
                </Aux>
            );
        }
        if (this.props.isAuthenticated) {
            authForm = <Redirect to={this.props.authRedirectPath} />;
        }
        return <div className={classes.Auth}>{authForm}</div>;
    }
}

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
