import Aux from "../../../hoc/Auxiliary";

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
            <p>Continue to checkout?</p>
        </Aux>
    );
};

export default orderSummary;
