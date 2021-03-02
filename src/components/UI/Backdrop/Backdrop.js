import classes from "./Backdrop.module.css";

// The Backdrop component could be added to the Modal because it is closely connected to this,ie, if the Modal is shown the Backdrop should be shown.
const backdrop = (props) => {
    return props.show ? (
        <div className={classes.Backdrop} onClick={props.clicked}></div>
    ) : null;
};

export default backdrop;
