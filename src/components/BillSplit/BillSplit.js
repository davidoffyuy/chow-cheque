import React from "react";
import styles from "./BillSplitStyles";
import NumSelector from "../../ui/NumSelector/NumSelector";

// material-ui imports
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import PersonIcon from "@material-ui/icons/Person";
import InputAdornment from "@material-ui/core/InputAdornment";

const billSplit = props => {
    // Set CSS classes
    const { classes } = props;

    // calculate $ amount being split among diners
    let splitAmount = "$" + props.convertTwoDecimal((Number(props.billAmount) + props.calcTip()) / props.persons.length);

    // generating persons TextFields
    const personsInput = props.persons.map((value, index, personsArr) => {
        return (
            <Grid item xs={12} key={"person" + index}>
                <TextField
                    label={"Diner " + (index + 1) + "/" + personsArr.length}
                    value={props.persons[index]}
                    onChange={event => props.handleChange(event, "persons", index)}
                    // value={props.billAmount}
                    margin="normal"
                    variant="outlined"
                    // className={classes.bill_amount}
                    fullWidth
                    placeholder="input name"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment>
                                <PersonIcon className={classes.person_icon} />
                            </InputAdornment>
                        )
                    }}
                    required
                />
            </Grid>
        );
    });

    return (
        <React.Fragment>
            <Grid item xs={6} style={{ textAlign: "center", alignSelf: "flex-end" }}>
                <Typography variant="h5" style={{ verticalAlign: "bottom" }}>
                    # of diners:
                </Typography>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "center" }}>
                <NumSelector
                    value={props.persons.length}
                    leftClick={props.handleChange}
                    rightClick={props.handleChange}
                    rightClickValue="persons.add"
                    leftClickValue="persons.subtract"
                />
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={2} style={{ padding: "1rem 1rem", marginTop: "1rem" }}>
                    <Typography variant="subtitle1">Each person owes... {splitAmount}</Typography>
                </Paper>
            </Grid>
            {personsInput}
        </React.Fragment>
    );
};

export default withStyles(styles)(billSplit);
