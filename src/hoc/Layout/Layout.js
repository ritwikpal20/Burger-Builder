import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import { connect } from "react-redux";
import Aux from "../../hoc/Auxiliary/Auxiliary";

// The layout component has been to Class based component because , we need to manage the sidedrawer with a property to show it only when clicked a button on Toolbar and close it when clicked on backdrop. And it will be moved to Hoc because it's only there to wrap another component.
const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    };

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer((prevState) => {
            return !prevState.showSideDrawer;
        });
    };

    return (
        <Aux>
            <SideDrawer
                isAuth={props.isAuthenticated}
                open={showSideDrawer}
                closed={sideDrawerClosedHandler}
            />
            <Toolbar
                isAuth={props.isAuthenticated}
                drawerToggleClicked={sideDrawerToggleHandler}
            />
            <div className={classes.ContentWrap}>
                <main className={classes.Content}>{props.children}</main>
                <Footer />
            </div>
        </Aux>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token != null,
    };
};

export default connect(mapStateToProps)(Layout);
