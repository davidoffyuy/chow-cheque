import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "./TipCalcStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const tipValues = [10, 12.5, 15, 17, 20];

class TipCalc extends Component {
    state = {
        billAmount: 0.0,
        tipPercent: 15
    };

    handleChange = (event, name) => {
        console.log(event);
        console.log(name);
        this.setState({
            [name]: event.target.value
        });
    };

    handleFocus = (event) => event.target.select();

    render() {


        const { classes } = this.props;
        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <div className={classes.form_element__div}>
                        {/* https://codesandbox.io/s/yvoqly7p8x */}
                        <TextField
                            id="outlined-name"
                            label="Bill Amount"
                            onChange={event =>
                                this.handleChange(event, "billAmount")
                            }
                            value={this.state.billAmount}
                            margin="normal"
                            variant="outlined"
                            // className={classes.bill_amount}
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment>$</InputAdornment>
                                )
                            }}
                            onFocus={(event) => {this.handleFocus(event)}}
                        />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.form_element__div}>
                        {/* src: https://codesandbox.io/s/lpvqzw5nm9 */}
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Tip"
                            // className={classes.textField}
                            value={this.state.tipPercent}
                            onChange={event =>
                                this.handleChange(event, "tipPercent")
                            }
                            // SelectProps={{
                            //     MenuProps: {
                            //         className: classes.menu
                            //     }
                            // }}
                            margin="normal"
                            variant="outlined"
                            fullWidth>
                            {tipValues.map(option => (
                                <MenuItem key={option} value={option}>
                                    {option.toString() + "%"}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </Grid>
                <Grid item xs={5}>
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.text_right}>
                        Tip Amount
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.text_right}>
                        {"$" + (this.state.billAmount * this.state.tipPercent * 0.01)}
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.text_right}>
                        Total Amount
                    </Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.text_right}>
                        {"$" + (Number(this.state.billAmount) +
                            this.state.billAmount *
                                this.state.tipPercent *
                                0.01)}
                    </Typography>
                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(TipCalc);
