// Modal is not a hoc even though it wraps around other components because it receives props , whereas Layout is a hoc and not a container even though it manages states because it is just there to wrap a component and does not receive props
import classes from "./Modal.module.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";
import React, { Component } from "react";

// we need to render this modal only when we show it and this also prevent rendering of child components, to improve performance
class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.show !== this.props.show ||
            nextProps.children !== this.props.children
        );
    }

    render() {
        return (
            <Aux>
                <Backdrop
                    show={this.props.show}
                    clicked={this.props.modalClosed}
                />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show
                            ? "translateY(0)"
                            : "translateY(-100vh)",
                        opacity: this.props.show ? "1" : "0",
                    }}
                >
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;
