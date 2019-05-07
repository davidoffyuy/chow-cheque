import React from "react";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import { withStyles } from "@material-ui/core/styles";
import styles from "./SnackbarContentWrapperStyles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";

// Main Source
// https://codesandbox.io/s/5kq4jv6vpn

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const snackbarContentWrapper = props => {
  const { classes, message, onClose, variant } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classes[variant] + " " + classes.margin}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classes.icon + " " + classes.iconVariant} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" className={classes.close} onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
    />
  );
};

snackbarContentWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired
};

export default withStyles(styles)(snackbarContentWrapper);
