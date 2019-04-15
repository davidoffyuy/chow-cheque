import React, { Component } from "react";
import TopAppBar from "../../components/TopAppBar/TopAppBar";
import TipCalc from "../../components/TipCalc/TipCalc";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./LayoutStyles.js";
import Grid from "@material-ui/core/Grid";
import TopTabs from "../TopTabs/TopTabs";

//@material-ui imports

class Layout extends Component {
    state = {
        tab: 0
    };

    tabChangeHandler = (event, value) => {
        this.setState({ tab: value });
    };

    render() {

        let tabContent = null;
        switch (this.state.tab) {
            case 0:
                tabContent = <TipCalc />;
                break;
            case 1:
                tabContent = <div>Bill Split</div>;
                break;
            default:
                tabContent = <TipCalc />;
                break;
        }

        const { classes } = this.props;
        return (
            <React.Fragment>
                <TopAppBar />
                <TopTabs
                    changeHandler={this.tabChangeHandler}
                    value={this.state.tab}
                />
                <div className={classes.tip_calc__container}>
                    <Grid
                        container
                        direction="row"
                        alignContent="flex-start"
                        spacing={16}
                        className={classes.main_content}>
                        {tabContent}
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Layout);
