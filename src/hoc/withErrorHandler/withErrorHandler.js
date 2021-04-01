import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";
import { useState, useEffect } from "react";

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, setError] = useState(null);
        const reqInterceptor = axios.interceptors.request.use(
            (request) => {
                setError(null);
                return request;
            },
            (err) => {
                setError(err);
                return err;
            }
        );
        const resInterceptor = axios.interceptors.response.use(
            (response) => response,
            (err) => {
                setError(err);
                return err;
            }
        );

        const errorConfirmedHandler = () => {
            setError(null);
        };

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            };
        }, [reqInterceptor, resInterceptor]);

        return (
            <Aux>
                <Modal show={error} modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>

                {/* You can fine tune the error msg to be displayed on the screen with the local catch method , so that the application comes to standstill instead of displaying spinner. */}
                <WrappedComponent {...props} />
            </Aux>
        );
    };
};

export default withErrorHandler;
