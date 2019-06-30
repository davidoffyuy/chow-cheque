import React from "react";

// material-ui imports
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from '@material-ui/core/TextField';

const SaveBillDialog = props => {
    // Expects
    // open
    // handleClose

    return (
        <Dialog
            fullWidth={true}
            maxWidth='sm'
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle>Store to Cloud</DialogTitle>
            <DialogContent>
                <TextField
                    label="Bill Name"
                    value={props.billName}
                    onChange={event => props.handleChange(event, "billName")}
                    // value={props.billAmount}
                    margin="normal"
                    variant="outlined"
                    // className={classes.bill_amount}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={props.handleSaveBill} color="primary" autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SaveBillDialog;
