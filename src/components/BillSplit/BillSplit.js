import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./BillSplitStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import RemoveIcon from "@material-ui/icons/RemoveCircle";
import Paper from "@material-ui/core/Paper";
import NumSelector from "../../ui/NumSelector/NumSelector";

const billSplit = props => {
    // Set CSS classes
    const { classes } = props;

    let splitAmount = "$" + Math.ceil((props.grandTotal / props.splitNum) * 100) * .01;

    return (
        <React.Fragment>
            <Grid item xs={6} style={{ textAlign: "center", alignSelf: "flex-end" }}>
                <Typography variant="h5" style={{verticalAlign: "bottom"}}># of Diners:</Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "center" }}>
                <NumSelector value={props.splitNum} leftClick={props.handleSubtract} rightClick={props.handleAdd}/>
            </Grid>
            <Grid item xs={12}>
                <Paper
                    elevation={2}
                    style={{ padding: "1rem 1rem", marginTop: "1rem" }}>
                    <Typography variant="subtitle1">
                        Each person owes...  {splitAmount}
                    </Typography>
                </Paper>
            </Grid>
        </React.Fragment>
    );
};

export default withStyles(styles)(billSplit);
