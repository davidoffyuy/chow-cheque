import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./NumSelectorStyles";
import IconArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import IconArrowRight from "@material-ui/icons/KeyboardArrowRight";

const numSelector = props => {
    const { classes } = props;

    // Set value to be displayed if exists
    let displayValue = 0;
    if (props.value)
        displayValue = props.value;

    return (
        <div className={classes.num_selector_container}>
            <div className={classes.num_selector_button_left} onClick={props.leftClick}>
                <IconArrowLeft style={{fontSize: "32"}} />
            </div>
            <div className={classes.num_selector_display}>
                <div style={{display: "inline", verticalAlign: "bottom", fontSize: "1.5rem"}}>{displayValue}</div>
            </div>
            <div className={classes.num_selector_button_right} onClick={props.rightClick}>
                <IconArrowRight style={{fontSize: "32"}}/>
            </div>
        </div>
    );
};

export default withStyles(styles)(numSelector);
