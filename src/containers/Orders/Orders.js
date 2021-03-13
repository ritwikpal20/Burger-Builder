import axios from "../../axios-orders";
import { Component } from "react";
import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
    state = {
        loading: true,
        fetchedOrders: [],
    };

    componentDidMount() {
        axios
            .get("/orders.json")
            .then((response) => {
                let fetchedOrders = [];
                for (let orderId in response.data) {
                    fetchedOrders.push({
                        ...response.data[orderId],
                        id: orderId,
                    });
                }
                this.setState({
                    loading: false,
                    fetchedOrders: fetchedOrders,
                });
            })
            .catch((err) => {
                this.setState({ loading: false });
            });
    }

    render() {
        let orders = <Spinner />;
        if (!this.state.loading) {
            orders = this.state.fetchedOrders.map((order) => {
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

export default withErrorHandler(Orders, axios);
