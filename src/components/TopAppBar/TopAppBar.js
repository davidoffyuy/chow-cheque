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
                        Chow Cheque
                    </Typography>
                    <div style={{flexGrow: 1}}></div>
                    <div className={classes.app_bar_icon_container} onClick={props.photoURL ? props.logout : props.login}>
                        {props.photoURL ? <img width="32" height="32" src={props.photoURL} alt="" /> : <Person style={{fontSize: "32"}} />}
                    </div>
                </Toolbar>
            </AppBar>
            {/* <div className={classes.myContent}>Testing<LabelOutlined className={classes.myIcon} /></div> */}
        </React.Fragment>
    );
};

topAppBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(topAppBar);
