import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import { Component } from "react";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
    return import("./containers/Checkout/Checkout");
});
const asyncAuth = asyncComponent(() => {
    return import("./containers/Auth/Auth");
});
const asyncOrders = asyncComponent(() => {
    return import("./containers/Orders/Orders");
});

class App extends Component {
    render() {
        let routes = (
            <Switch>
                <Route path="/auth" component={asyncAuth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={asyncCheckout} />
                    <Route path="/orders" component={asyncOrders} />
                    <Route path="/auth" component={asyncAuth} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            );
        }
        return <Layout>{routes}</Layout>;
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token != null,
    };
};

export default withRouter(connect(mapStateToProps)(App));
