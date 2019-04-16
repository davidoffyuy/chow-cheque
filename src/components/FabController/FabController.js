import React from 'react';
import Fab from "@material-ui/core/Fab";
import SplitIcon from "@material-ui/icons/CallSplit";
import MoneyIcon from "@material-ui/icons/AttachMoney";
import styles from "./FabControllerStyles.js";


import withStyles from "@material-ui/core/styles/withStyles";

const fabController = props => {
    const {classes} = props;

    return (
        <Fab size="large" onClick={props.clicked} color="secondary">
            {props.tab === 0 && <SplitIcon />}
            {props.tab === 1 && <MoneyIcon />}
        </Fab>
    )

}

export default withStyles(styles)(fabController);