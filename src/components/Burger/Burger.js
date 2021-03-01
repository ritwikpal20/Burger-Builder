import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const burger = (props) => {
    // transforming the ingredients object into array of JSX elements
    let transformedIngredients = [];
    for (const ingredient in props.ingredients) {
        for (let i = 0; i < props.ingredients[ingredient]; i++) {
            transformedIngredients.push(
                <BurgerIngredient key={ingredient + i} type={ingredient} />
            );
        }
    }

    if (transformedIngredients.length === 0)
        transformedIngredients = <p>Please start adding ingredients</p>;

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;
