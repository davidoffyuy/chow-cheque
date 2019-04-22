import React, { Component, Suspense } from "react";
import TopAppBar from "../../components/TopAppBar/TopAppBar";
import TipCalc from "../../components/TipCalc/TipCalc";
import styles from "./LayoutStyles.js";
import TopTabs from "../TopTabs/TopTabs";
import FabController from "../../components/FabController/FabController";
import BillSplit from "../../components/BillSplit/BillSplit";

// @material-ui imports
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

class Layout extends Component {
    state = {
        tab: 0,
        billAmount: "0",
        tipPercent: 15,
        grandTotal: 0,
        splitNum: 2,
        remainder: false
    };

    // componentDidMount() {
    //     console.log("Context");
    //     console.log(this.props.contextValue);
    //     const rootRef = this.props.contextValue.database().ref('testdb').once("value").then(results => {
    //         console.log(results);
    //         console.dir(results.key);
    //         results.forEach(function(posts){
    //             console.log(posts.val()); // value of the post
    //             console.log(posts.key); // ID of the post
    //         });
    //     });
    // }

    tabChangeHandler = (event, value) => {
        this.setState({ tab: value });
    };

    calcTip = () => {
        return Math.ceil(this.state.billAmount * this.state.tipPercent) * 0.01;
    };

    handleChange = (name, value) => {
        this.setState(
            {
                [name]: value
            },
            () => {
                this.setState(prevState => ({
                    grandTotal: Number(prevState.billAmount) + this.calcTip()
                }));
            }
        );
    };

    twoDecimalCheck = value => {
        if (value * 100 - Math.floor(value * 100) === 0) return true;
        else return false;
    };

    handleTipCalcStateChange = (event, name) => {
        switch (name) {
            case "billAmount":
                // Check if Bill Amount entered is a number. Reject all non-numeric values.
                if (!isNaN(event.target.value) && this.twoDecimalCheck(event.target.value)) {
                    this.handleChange(name, event.target.value);
                }
                break;
            default:
                this.handleChange(name, event.target.value);
                break;
        }
    };

    handleBillSplitStateChange = (event, name) => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleAddSplitNum = () => {
        const copyNum = this.state.splitNum;
        this.setState({ splitNum: copyNum + 1 });
    };
    handleSubtractSplitNum = () => {
        const copyNum = this.state.splitNum;
        if (copyNum > 1) {
            this.setState({ splitNum: copyNum - 1 });
        }
    };

    fabClickHandler = () => {
        if (this.state.tab === 0) {
            this.setState({ tab: 1 });
        }
        if (this.state.tab === 1) {
            this.setState({ tab: 0 });
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <TopAppBar />
                <TopTabs changeHandler={this.tabChangeHandler} value={this.state.tab} />
                <div className={classes.tip_calc__container}>
                    <Grid
                        container
                        direction="row"
                        alignContent="flex-start"
                        alignItems="center"
                        spacing={16}
                        className={classes.main_content}>
                        {this.state.tab === 0 && (
                            <TipCalc
                                handleChange={this.handleTipCalcStateChange}
                                billAmount={this.state.billAmount}
                                tipPercent={this.state.tipPercent}
                                calcTip={this.calcTip}
                            />
                        )}
                        {this.state.tab === 1 && (
                            <BillSplit
                                handleAdd={this.handleAddSplitNum}
                                handleSubtract={this.handleSubtractSplitNum}
                                handleChange={this.handleBillSplitStateChange}
                                splitNum={this.state.splitNum}
                                grandTotal={this.state.grandTotal}
                            />
                        )}
                    </Grid>
                </div>
                <div className={classes.main_fab}>
                    <FabController clicked={this.fabClickHandler} tab={this.state.tab} />
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Layout);
