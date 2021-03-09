import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";
import { Component } from "react";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = { error: null };
        reqInterceptor = axios.interceptors.request.use(
            (request) => request,
            (err) => {
                this.setState({ error: err });
                return err;
            }
        );
        resInterceptor = axios.interceptors.response.use(
            (response) => response,
            (err) => {
                this.setState({ error: err });
                return err;
            }
        );

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

        // Set up a new req interceptor , for setting error state to null once the component is mounted (cannot set state before mounting)
        componentDidMount() {
            axios.interceptors.request.eject(this.reqInterceptor);
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
        }

        // withErrorHandler is a hoc , therefore we can wrap multiple components with it , and therefore we set up multiple interceptors , but which we might not need when the component is unmounted since it leads to state errors and memory leaks.Therefore, we need to remove those.
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.resonse.eject(this.resInterceptor);
        }
    };
};

export default withErrorHandler;
