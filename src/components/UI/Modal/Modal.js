// Modal is not a hoc even though it wraps around other components because it receives props , whereas Layout is a hoc and not a container even though it manages states because it is just there to wrap a component and does not receive props
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";
import React from "react";

// we need to render this modal only when we show it and this also prevent rendering of child components, to improve performance
const Modal = (props) => {
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show
                        ? "translateY(0)"
                        : "translateY(-100vh)",
                    opacity: props.show ? "1" : "0",
                }}
            >
                {props.children}
            </div>
        </Aux>
    );
};

export default React.memo(Modal);
