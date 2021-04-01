import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import React, { Suspense } from "react";
import Spinner from "./components/UI/Spinner/Spinner";

const Checkout = React.lazy(() => import("./containers/Checkout/Checkout"));
const Auth = React.lazy(() => import("./containers/Auth/Auth"));
const Orders = React.lazy(() => import("./containers/Orders/Orders"));

const app = (props) => {
    let routes = (
        <Switch>
            <Route path="/auth" render={(props) => <Auth {...props} />} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
        </Switch>
    );
    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route
                    path="/checkout"
                    render={(props) => <Checkout {...props} />}
                />
                <Route
                    path="/orders"
                    render={(props) => <Orders {...props} />}
                />
                <Route path="/auth" render={(props) => <Auth {...props} />} />
                <Route path="/logout" component={Logout} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );
    }
    return (
        <Layout>
            <Suspense fallback={<Spinner />}>{routes} </Suspense>
        </Layout>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token != null,
    };
};

export default withRouter(connect(mapStateToProps)(app));
