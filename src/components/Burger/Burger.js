import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const burger = (props) => {
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            <BurgerIngredient type="bacon" />
            <BurgerIngredient type="salad" />
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;
