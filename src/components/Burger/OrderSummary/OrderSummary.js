import Aux from "../../../hoc/Auxiliary";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients).map((igKey) => {
        return (
            <li key={igKey}>
                <span style={{ textTransform: "capitalize" }}>{igKey}</span> :{" "}
                {props.ingredients[igKey]}
            </li>
        );
    });
    return (
        <Aux>
            <h3>Order Summary</h3>
            <p>
                You have added following indregients to your delicious burger:
            </p>
            <ul>{ingredientsSummary}</ul>
            <p>
                <strong>Total Price : {props.price.toFixed(2)}</strong>
            </p>
            <p>Continue to checkout?</p>
            <Button btnType="Success" clicked={props.purchaseCanceled}>
                CANCEL
            </Button>
            <Button btnType="Danger" clicked={props.purchaseContinued}>
                CONTINUE
            </Button>
        </Aux>
    );
};

export default orderSummary;
