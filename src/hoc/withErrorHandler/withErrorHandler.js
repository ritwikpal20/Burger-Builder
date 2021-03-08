import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";
import { Component } from "react";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        };

        componentDidMount() {
            axios.interceptors.request.use(
                (request) => {
                    this.setState({ error: null });
                    return request;
                },
                (err) => {
                    this.setState({ error: err });
                    return err;
                }
            );
            axios.interceptors.response.use(
                (response) => response,
                (err) => {
                    this.setState({ error: err });
                    return err;
                }
            );
        }
        errorConfirmedHandler = () => {
            this.setState({ error: null });
        };

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    };
};

export default withErrorHandler;
