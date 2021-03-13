import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";
import { Component } from "react";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = { error: null };

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        };

        render() {
            if (this.reqInterceptor && this.resInterceptor) {
                // Donot set up the interceptors again
            } else {
                this.reqInterceptor = axios.interceptors.request.use(
                    (request) => {
                        this.setState({ error: null });
                        return request;
                    },
                    (err) => {
                        this.setState({ error: err });
                        return err;
                    }
                );
                this.resInterceptor = axios.interceptors.response.use(
                    (response) => response,
                    (err) => {
                        this.setState({ error: err });
                        return err;
                    }
                );
            }
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>

                    {/* You can fine tune the error msg to be displayed on the screen with the local catch method , so that the application comes to standstill instead of displaying spinner. */}
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }

        // withErrorHandler is a hoc , therefore we can wrap multiple components with it , and therefore we set up multiple interceptors , but which we might not need when the component is unmounted since it leads to state errors and memory leaks.Therefore, we need to remove those.
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
    };
};

export default withErrorHandler;
