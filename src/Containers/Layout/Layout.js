import React, { Component, Suspense } from "react";
import TopAppBar from "../../components/TopAppBar/TopAppBar";
import TipCalc from "../../components/TipCalc/TipCalc";
import styles from "./LayoutStyles.js";
import TopTabs from "../TopTabs/TopTabs";
// import BillSplit from '../../components/BillSplit/BillSplit';

// @material-ui imports
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

// LazyLoading
const LazyBillSplit = React.lazy(() =>
    import("../../components/BillSplit/BillSplit")
);

class Layout extends Component {
    state = {
        tab: 0,
        billAmount: 0.0,
        tipPercent: 15,
        grandTotal: 0,
        splitNum: 2
    };

    tabChangeHandler = (event, value) => {
        this.setState({ tab: value });
    };

    handleTipCalcStateChange = (event, name) => {
        this.setState(
            {
                [name]: event.target.value
            },
            () => {
                this.setState(prevState => ({
                    grandTotal:
                        Number(prevState.billAmount) +
                        prevState.billAmount * prevState.tipPercent * 0.01
                }));
            }
        );
    };

    handleBillSplitStateChange = (event, name) => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleAddSplitNum = () => {
        const copyNum = this.state.splitNum;
        this.setState({splitNum: copyNum + 1});
    }
    handleSubtractSplitNum = () => {
        const copyNum = this.state.splitNum;
        if (copyNum > 1)
        {
            this.setState({splitNum: copyNum - 1});

        }
    }

    render() {
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
                        alignItems="center"
                        spacing={16}
                        className={classes.main_content}>
                        <Suspense fallback={<div>loading</div>}>
                            {this.state.tab === 0 && (
                                <TipCalc
                                    handleChange={this.handleTipCalcStateChange}
                                    billAmount={this.state.billAmount}
                                    tipPercent={this.state.tipPercent}
                                />
                            )}
                            {this.state.tab === 1 && (
                                <LazyBillSplit
                                    handleAdd={this.handleAddSplitNum}
                                    handleSubtract={this.handleSubtractSplitNum}
                                    handleChange={
                                        this.handleBillSplitStateChange
                                    }
                                    splitNum={this.state.splitNum}
                                    grandTotal={this.state.grandTotal}
                                />
                            )}
                        </Suspense>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Layout);
