import React, { Component, Suspense } from "react";
import TopAppBar from "../../components/TopAppBar/TopAppBar";
import TipCalc from "../../components/TipCalc/TipCalc";
import styles from "./LayoutStyles.js";
import TopTabs from "../TopTabs/TopTabs";
import FabController from "../../components/FabController/FabController";
import BillSplit from "../../components/BillSplit/BillSplit";
import SaveBillDialog from "../../components/SaveBillDialog/SaveBillDialog";

// @material-ui imports
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

class Layout extends Component {
    state = {
        tab: 0,
        billAmount: "",
        billName: "",
        tipPercent: 15,
        grandTotal: 0,
        remainder: false,
        persons: ["", ""],
        openSaveBillDialog: false
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
        return Math.ceil(this.state.billAmount * this.state.tipPercent) / 100;
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

    handleTipCalcStateChange = (event, name, value = null) => {
        switch (name) {
            case "billAmount":
                if (value === null) {
                    // Check if Bill Amount entered is a number. Reject all non-numeric values.
                    if (!isNaN(event.target.value) && this.twoDecimalCheck(event.target.value)) {
                        this.handleChange(name, event.target.value);
                    }
                }
                else {
                    this.handleChange(name, value);
                    document.getElementById("bill-amount").focus();
                }
                break;
            default:
                this.handleChange(name, event.target.value);
                break;
        }
    };

    handleBillSplitStateChange = (event = null, name, index = 0) => {
        let newPersons = null;
        switch (name) {
            case "persons":
                newPersons = [...this.state.persons];
                newPersons[index] = event.target.value;
                this.setState({
                    persons: newPersons
                });
                break;
            case "persons.add":
                newPersons = [...this.state.persons, ""];
                this.setState(state => ({
                    persons: newPersons,
                    splitNum: state.splitNum + 1
                }));
                break;
            case "persons.subtract":
                if (this.state.persons.length > 2) {
                    newPersons = [...this.state.persons, ""].slice(0, this.state.persons.length - 1);
                    this.setState(state => ({
                        persons: newPersons,
                        splitNum: state.splitNum - 1
                    }));
                }
                break;
            default:
                this.setState({
                    [name]: event.target.value
                });
                break;
        }
    };

    twoDecimalCheck = value => {
        if (value * 100 - Math.floor(value * 100) === 0)
            return true;
        else 
            return false;
    };

    fabClickHandler = () => {
        switch (this.state.tab) {
            case 0:
                this.setState({ tab: 1 });
                break;
            case 1:
                this.setState({ openSaveBillDialog: true });
                break;
            default:
                break;
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
                                handleChange={this.handleBillSplitStateChange}
                                splitNum={this.state.persons.length}
                                grandTotal={this.state.grandTotal}
                                persons={this.state.persons}
                            />
                        )}
                    </Grid>
                </div>
                <div className={classes.main_fab}>
                    <FabController clicked={this.fabClickHandler} tab={this.state.tab} />
                </div>
                <SaveBillDialog
                    open={this.state.openSaveBillDialog}
                    handleClose={() => {
                        this.setState({ openSaveBillDialog: false });
                    }}
                    handleChange={this.handleBillSplitStateChange}
                />
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Layout);
