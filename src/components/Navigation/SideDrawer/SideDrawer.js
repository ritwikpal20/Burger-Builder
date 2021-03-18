import classes from "./SideDrawer.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

const sideDrawer = (props) => {
    let sideDrawerClasses = [classes.SideDrawer, classes.Close];
    if (props.open) sideDrawerClasses = [classes.SideDrawer, classes.Open];

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={sideDrawerClasses.join(" ")}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;
