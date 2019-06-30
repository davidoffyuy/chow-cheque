import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import styles from "./TipCalcStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ClearIcon from "@material-ui/icons/Clear";

const tipValues = [10, 12.5, 15, 17, 20];

const TipCalc = props => {
  // Set CSS classes
  const { classes } = props;

  return (
    <React.Fragment>
      <Grid item xs={12}>
        {/* https://codesandbox.io/s/yvoqly7p8x */}
        <TextField
          id="bill-amount"
          label="Bill Amount"
          onChange={event => props.handleChange(event, "billAmount")}
          value={props.billAmount}
          margin="normal"
          variant="outlined"
          // className={classes.bill_amount}
          fullWidth
          type="number"
          InputProps={{
            startAdornment: <InputAdornment>$</InputAdornment>,
            endAdornment:
              props.billAmount !== "" ? (
                <InputAdornment>
                  <ClearIcon onClick={event => props.handleChange(event, "billAmount", "")} />
                </InputAdornment>
              ) : null
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <div className={classes.form_element__div}>
          {/* src: https://codesandbox.io/s/lpvqzw5nm9 */}
          <TextField
            id="select-tip"
            select
            label="Tip"
            // className={classes.textField}
            value={props.tipPercent}
            onChange={event => props.handleChange(event, "tipPercent")}
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
      <Grid item xs={7}>
        <Typography variant="h5" color="inherit" className={classes.text_right}>
          Tip Amount
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="h5" color="inherit" className={classes.text_right}>
          {"$" + props.calcTip()}
        </Typography>
      </Grid>
      <Grid item xs={7}>
        <Typography variant="h5" color="inherit" className={classes.text_right}>
          Total Amount
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="h5" color="inherit" className={classes.text_right}>
          {"$" + props.convertTwoDecimal(Number(props.billAmount) + props.calcTip())}
        </Typography>
      </Grid>
    </React.Fragment>
  );
};

export default withStyles(styles)(TipCalc);
