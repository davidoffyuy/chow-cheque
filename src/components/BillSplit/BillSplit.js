import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "./BillSplitStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import RemoveIcon from "@material-ui/icons/RemoveCircle";
import Paper from "@material-ui/core/Paper";

const billSplit = props => {
    // Set CSS classes
    const { classes } = props;

    let splitAmount = "$" + (props.grandTotal / props.splitNum);

    return (
        <React.Fragment>
            <Grid item xs={4} style={{ textAlign: "right" }}>
                <RemoveIcon style={{ fontSize: 48 }} onClick={props.handleSubtract} />
            </Grid>
            <Grid item xs={4} style={{ textAlign: "center" }}>
                <Typography variant="h1">{props.splitNum}</Typography>
            </Grid>
            <Grid item xs={4} style={{ textAlign: "left" }}>
                <AddIcon style={{ fontSize: 48 }} onClick={props.handleAdd} />
            </Grid>
            <Grid item xs={12}>
                <Paper
                    elevation={2}
                    style={{ padding: "2rem 2rem", marginTop: "4rem" }}>
                    <Typography variant="subtitle1">
                        Each person owes...
                    </Typography>
                    <Typography variant="subtitle1" style={{textAlign: "right"}}>
                        {splitAmount}
                    </Typography>
                </Paper>
            </Grid>
        </React.Fragment>
    );
};

export default withStyles(styles)(billSplit);
