import React, { useState } from "react";

// material imports
import withStyles from "@material-ui/core/styles/withStyles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
  menuItem: {}
});

const userMenu = props => {
  const { classes } = props;

  return (
    <Menu
      className={classes.menuItem}
      id="user-menu"
      anchorEl={props.menuEl}
      open={Boolean(props.menuEl)}
      onClose={props.handleClose}>
      {props.loginStatus ? (
        <MenuItem onClick={() => {props.logout(); props.handleClose();}}>Logout</MenuItem>
      ) : (
        <MenuItem onClick={() => {props.login(); props.handleClose();}}>Login</MenuItem>
      )}
      <MenuItem onClick={props.handleClose}>Cancel</MenuItem>
    </Menu>
  );
};

export default withStyles(styles)(userMenu);
