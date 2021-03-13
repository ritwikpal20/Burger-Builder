import classes from "./Order.module.css";

const order = (props) => {
    let ingredients = [];

    for (let ig in props.ingredients) {
        ingredients.push(
            <span
                style={{
                    textTransform: "capitalize",
                    border: "2px solid black",
                    margin: "10px",
                    display: "inline-block",
                    padding: "2px",
                }}
            >
                {ig} ({props.ingredients[ig]})
            </span>
        );
    }

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>
                <strong>Price : Rs {props.price}</strong>
            </p>
        </div>
    );
};

export default order;
