import React from 'react';
import Fab from "@material-ui/core/Fab";
import SplitIcon from "@material-ui/icons/CallSplit";
import SaveIcon from "@material-ui/icons/CloudUpload";
import AddIcon from "@material-ui/icons/Add";
import styles from "./FabControllerStyles.js";


import withStyles from "@material-ui/core/styles/withStyles";

const fabController = props => {
    const {classes} = props;

    return (
        <Fab size="large" onClick={props.clicked} color="secondary" disabled={props.disabled} className={props.move ? classes.fab_up : classes.fab_down} >
            {props.tab === 0 && <SplitIcon className={classes.fab_icon} />}
            {props.tab === 1 && <SaveIcon className={classes.fab_icon} />}
            {props.tab === 2 && <AddIcon className={classes.fab_icon} />}
        </Fab>
    )

}

export default withStyles(styles)(fabController);