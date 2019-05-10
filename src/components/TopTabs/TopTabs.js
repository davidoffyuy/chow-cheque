import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const topTabs = props => {
    return (
        <AppBar position="static" color="default">
            <Tabs
                value={props.value}
                onChange={props.changeHandler}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth">
                <Tab label="Tip Calc" />
                <Tab label="Bill Split" />
                <Tab label="Saved Bills" disabled={!props.loggedIn} />
            </Tabs>
        </AppBar>
    );
};

export default topTabs;
