import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import styles from "./TopAppBarStyles";
import Person from "@material-ui/icons/Person";

const topAppBar = props => {
  // expects photoURL

  const { classes } = props;

  return (
    <React.Fragment>
      <AppBar position="relative" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Chowculator
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <div className={classes.app_bar_icon_container} onClick={props.photoURL ? props.logout : props.login}>
            {props.photoURL ? (
              <img width="36" height="36" src={props.photoURL} alt="" />
            ) : (
              <Person style={{ fontSize: "36" }} />
            )}
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

topAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(topAppBar);
