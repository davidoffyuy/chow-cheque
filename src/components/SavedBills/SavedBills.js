import React, { useState } from "react";

import { withStyles } from "@material-ui/core/styles";
import styles from "./SavedBillsStyles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const savedBills = props => {
    const { classes } = props;

    // Hooks
    const [panelOpen, setPanelOpen] = useState(null);

    const handleChange = panel => (event, expanded) => {
        setPanelOpen(expanded ? panel : false);
    };

    const billsKeys = Object.keys(props.bills);
    const billsValues = Object.values(props.bills);

    let billsPanels = billsValues.map((value, index) => {
        return (
            <ExpansionPanel expanded={panelOpen === ("panel" + index)} onChange={handleChange("panel" + index)}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>General settings</Typography>
                <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est,
                    id dignissim quam.
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        )
    })

    return (
        <div className={classes.root}>
            {billsPanels}
        </div>
    );
};

export default withStyles(styles)(savedBills);
