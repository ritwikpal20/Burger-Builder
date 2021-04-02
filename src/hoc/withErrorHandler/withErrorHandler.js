import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";
import useHttpErrorHandler from "../../hooks/http-error-handler";

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, errorConfirmedHandler] = useHttpErrorHandler(axios);
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
