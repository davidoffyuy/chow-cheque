import React, { Component, Suspense } from "react";
import TopAppBar from "../../components/TopAppBar/TopAppBar";
import TipCalc from "../../components/TipCalc/TipCalc";
import styles from "./LayoutStyles.js";
import TopTabs from "../TopTabs/TopTabs";
import FabController from "../../components/FabController/FabController";
import BillSplit from "../../components/BillSplit/BillSplit";
import SaveBillDialog from "../../components/SaveBillDialog/SaveBillDialog";
import firebase from "firebase";

// @material-ui imports
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

class Layout extends Component {
    state = {
        tab: 0,
        billAmount: "",
        billName: "",
        tipPercent: 15,
        remainder: false,
        persons: ["", ""],
        openSaveBillDialog: false,
        user: ""
    };

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged(user => {
            if (user) {
              // User is signed in.
              console.log("componentDidMount: user");
              console.log(user);
              this.setState({user: user});
            } else {
              // No user is signed in.
              this.setState({user: ""});
              console.log("user is NOT logged in");
            }
          });
    }

    tabChangeHandler = (event, value) => {
        this.setState({ tab: value });
    };

    calcTip = () => {
        return Math.ceil(this.state.billAmount * this.state.tipPercent) / 100;
    };

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    };

    handleTipCalcStateChange = (event, name, value = null) => {
        switch (name) {
            case "billAmount":
                if (value === null) {
                    // Check if Bill Amount entered is a number. Reject all non-numeric values.
                    if (!isNaN(event.target.value) && this.twoDecimalCheck(event.target.value)) {
                        this.handleChange(name, event.target.value);
                    }
                } else {
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
        if (value * 100 - Math.floor(value * 100) === 0) return true;
        else return false;
    };
    convertTwoDecimal = value => {
        return Math.ceil(value * 100) / 100;
    };

    fabClickHandler = () => {
        switch (this.state.tab) {
            case 0:
                this.setState({ tab: 1 });
                break;
            case 1:
                if (this.state.user) {
                    this.setState({ openSaveBillDialog: true });
                } else {
                    this.handleLogin();
                }
                break;
            default:
                break;
        }
    };

    // if user is not already logged in, go through log in process
    handleLogin = () => {
        if (!this.state.user) {
            let provider = new firebase.auth.GoogleAuthProvider();

            this.props.firebase
                .auth()
                .signInWithPopup(provider)
                .then(result => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    console.log("credential");
                    console.log(result.credential);
                    // The signed-in user info.
                    var user = result.user;
                    console.log("user.uid");
                    console.log(user.uid);
                    this.setState({ user: result.user });
                    // ...
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });
        }
    };

    handleLogout = () => {
        console.log("signing out");
        if (this.state.user)
        {
            this.props.firebase.auth().signOut().then(function() {
                this.setState({user: ""});
              }).catch(function(error) {
                // An error happened.
              });
        }
    }

    handleSaveBill = () => {
        const personsData = {}
        for (let i = 0; i < this.state.persons.length; i++) {
            personsData[this.state.persons[i]] = 0;
        }

        const postData = {
            billAmount: this.state.billAmount,
            billName: this.state.billName,
            persons: personsData
        };
        const newKey = this.props.firebase
            .database()
            .ref()
            .child("bills")
            .push().key;

        let updates = {};
        updates["/bills/" + this.state.user.uid + "/" + newKey] = postData;
        this.props.firebase
            .database()
            .ref()
            .update(updates);
    };

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <TopAppBar photoURL={this.state.user ? this.state.user.photoURL : ""} login={this.handleLogin} logout={this.handleLogout} />
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
                                convertTwoDecimal={this.convertTwoDecimal}
                            />
                        )}
                        {this.state.tab === 1 && (
                            <BillSplit
                                handleChange={this.handleBillSplitStateChange}
                                billAmount={this.state.billAmount}
                                calcTip={this.calcTip}
                                persons={this.state.persons}
                                convertTwoDecimal={this.convertTwoDecimal}
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
                    handleSaveBill={this.handleSaveBill}
                />
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Layout);
