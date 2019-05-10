import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import styles from "./TopAppBarStyles";
import Person from "@material-ui/icons/Person";
import UserMenu from "./UserMenu/userMenu";

const topAppBar = props => {
  // expects photoURL, logout(), login()

  const { classes } = props;
  const [menuEl, setMenuEl] = useState(null);
  const menuOpenHandler = event => {
    setMenuEl(event.currentTarget);
  };
  const menuCloseHandler = () => {
    setMenuEl(null);
  };

  return (
    <React.Fragment>
      <AppBar position="relative" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Chowculator
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <div className={classes.app_bar_icon_container} onClick={event => menuOpenHandler(event)}>
            {props.photoURL ? (
              <img width="36" height="36" src={props.photoURL} alt="" />
            ) : (
              <Person style={{ fontSize: "36" }} />
            )}
          </div>
        </Toolbar>
      </AppBar>
      <UserMenu
        loginStatus={props.photoURL ? true : false}
        menuEl={menuEl}
        handleClose={menuCloseHandler}
        login={props.login}
        logout={props.logout}
      />
    </React.Fragment>
  );
};

topAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(topAppBar);
