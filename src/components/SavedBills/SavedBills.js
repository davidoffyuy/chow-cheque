import React, { useState } from "react";

import { withStyles } from "@material-ui/core/styles";
import styles from "./SavedBillsStyles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Person";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";

const savedBills = props => {
    const { classes } = props;

    // Hooks
    const [panelOpen, setPanelOpen] = useState(null);

    const handleChange = panel => (event, expanded) => {
        setPanelOpen(expanded ? panel : false);
    };

    const billsKeys = Object.keys(props.bills);
    const billsValues = Object.values(props.bills);

    let billsPanels = billsValues.map((value, index, arr) => {
        let personsListKeys = Object.keys(billsValues[index].persons);
        let personsListValues = Object.values(billsValues[index].persons);
        let dollarPerPerson = props.convertTwoDecimal(billsValues[index].billAmount / billsValues.length);
        let billId = billsKeys[index];

        let displayPersonsList = personsListKeys.map((value, index) => {
            return (
                <ListItem key={"test" + index}>
                    <ListItemText primary={personsListKeys[index]} secondary={personsListValues[index] === 1 ? "paid" : "unpaid"} />
                    <ListItemSecondaryAction
                        onClick={() => {
                            console.log("clicked");
                        }}>
                        <Checkbox id={ +"+" + personsListKeys[index]}
                            onChange={(event) => {props.updatePaidStatus(event, billId ,personsListKeys[index])}}
                            checked={personsListValues[index] === 1 ? true : false}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            );
        });

        return (
            <ExpansionPanel
                key={"moretest" + index}
                expanded={panelOpen === "panel" + index}
                onChange={handleChange("panel" + index)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>{billsValues[index].billName}</Typography>
                    <Typography className={classes.secondaryHeading}>${billsValues[index].billAmount} (${dollarPerPerson} ea)</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List dense className={classes.saved_bill_list_item}>{displayPersonsList}</List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    });

    return (
        <Grid item xs={12} key={"persons"}>
            {billsPanels}
        </Grid>
    );
};

export default withStyles(styles)(savedBills);
