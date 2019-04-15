import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import styles from "./TopAppBarStyles";
import RestaurantMenu from "@material-ui/icons/RestaurantMenu";

const topAppBar = props => {
    const { classes } = props;

    return (
        <React.Fragment>
            <AppBar position="relative" color="primary">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Chow Cheque
                    </Typography>
                    <div style={{flexGrow: 1}}></div>
                    <RestaurantMenu style={{fontSize: "24"}} />
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
