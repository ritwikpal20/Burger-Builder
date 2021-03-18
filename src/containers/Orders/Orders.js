import axios from "../../axios-orders";
import { Component } from "react";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map((order) => {
                return (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                );
            });
        }
        return <div>{orders}</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.order.loading,
        orders: state.order.orders,
        token: state.auth.token,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Orders, axios));
