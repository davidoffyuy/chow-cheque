import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../SnackbarContentWrapper/SnackbarContentWrapper";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    testStyle: {
        width: "100%"
    }
})

const mobileAlertSnackbar = props => {
    const {classes} = props

    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
            }}
            open={props.open}
            // autoHideDuration={6000}
            onClose={props.handleClose}>
            <SnackbarContentWrapper onClose={props.handleClose} variant="warning" message="UI Designed for Mobile!" />
        </Snackbar>
    );
};

export default withStyles(styles)(mobileAlertSnackbar);
