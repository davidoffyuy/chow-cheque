import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "../../../ui/SnackbarContentWrapper/SnackbarContentWrapper";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  testStyle: {
    width: "100%"
  }
});

const EmptySnackbar = props => {
  const { classes } = props;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={props.open}
      onClose={props.handleClose}>
      <SnackbarContentWrapper onClose={props.handleClose} variant="info" message="No Saved Bills Found!" />
    </Snackbar>
  );
};

export default withStyles(styles)(EmptySnackbar);
