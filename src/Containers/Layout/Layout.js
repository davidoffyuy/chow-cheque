import React, { Component } from "react";
import TopAppBar from "../../components/TopAppBar/TopAppBar";
import TipCalc from "../../components/TipCalc/TipCalc";
import styles from "./LayoutStyles.js";
import TopTabs from "../../components/TopTabs/TopTabs";
import FabController from "../../components/FabController/FabController";
import BillSplit from "../../components/BillSplit/BillSplit";
import SaveBillDialog from "../../components/SaveBillDialog/SaveBillDialog";
import SavedBills from "../../components/SavedBills/SavedBills";
import firebase from "firebase";
import MobileAlertSnackbar from "../../ui/MobileAlertSnackbar/MobileAlertSnackbar";

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
    user: "",
    bills: "",
    showMobileAlert: false,
    showSnackbar: false
  };

  componentDidMount() {
    //Create listener for user authentication state changes.
    this.props.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        console.log("componentDidMount: user");
        console.log(user);
        this.setState({ user: user });

        // Get saved bills from the user after logging in.
        let bills = this.props.firebase.database().ref("bills/" + user.uid);
        bills.on("value", snapshot => {
          this.setState({ bills: snapshot.val() });
        });
      } else {
        // No user is signed in.
        this.setState({
          user: "",
          bills: ""
        });
        console.log("user is NOT logged in");
      }
    });
    //Check if user is NOT on mobile
    if (!(typeof window.orientation !== "undefined") || navigator.userAgent.indexOf("IEMobile") !== -1) {
      this.setState({ showMobileAlert: true, showSnackbar: true });
    }
  }

  // if user is not already logged in, go through log in process
  handleLogin = () => {
    if (!this.state.user) {
      let provider = new firebase.auth.GoogleAuthProvider();

      this.props.firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          console.log("logging in");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    }
  };

  // if user is not logged in, then start the logout process and set user to nothing
  handleLogout = () => {
    console.log("signing out");
    if (this.state.user) {
      this.props.firebase
        .auth()
        .signOut()
        .then(function() {})
        .catch(function(error) {
          // An error happened.
        });
    }
  };

  tabChangeHandler = (event, value) => {
    this.setState({ tab: value });
  };

  calcTip = () => {
    return Math.ceil(this.state.billAmount * this.state.tipPercent) / 100;
  };

  twoDecimalCheck = value => {
    if (value * 100 - Math.floor(value * 100) === 0) return true;
    else return false;
  };

  convertTwoDecimal = value => {
    return Math.ceil(value * 100) / 100;
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

  // action for the fab button based on which tab user is in.
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
      case 2:
        this.setState({ tab: 0 });
        break;
      default:
        break;
    }
  };

  checkPersonsNotEmpty = () => {
    return this.state.persons.reduce((acc, value) => {
      return acc && value !== "";
    }, true);
  };

  handleSaveBill = () => {
    const personsData = {};
    for (let i = 0; i < this.state.persons.length; i++) {
      personsData[this.state.persons[i]] = 0;
    }

    const postData = {
      billDate: new Date(),
      billAmount: this.state.billAmount,
      billName: this.state.billName,
      perPersonAmount: this.convertTwoDecimal(
        (Number(this.state.billAmount) + this.calcTip()) / this.state.persons.length
      ),
      persons: personsData
    };
    const newKey = this.props.firebase
      .database()
      .ref()
      .child("bills")
      .push().key;

    let updates = {};
    updates["bills/" + this.state.user.uid + "/" + newKey] = postData;
    this.props.firebase
      .database()
      .ref()
      .update(updates);

    this.setState({ openSaveBillDialog: false, tab: 2 });
  };

  handleUpdatePaidStatus = (event, billId, personName) => {
    let userRef = this.props.firebase.database().ref("bills/" + this.state.user.uid + "/" + billId + "/persons/");
    userRef.update({ [personName]: event.target.checked ? 1 : 0 });
  };

  handleDeleteBill = (event, billKey) => {
    let userRef = this.props.firebase.database().ref("bills/" + this.state.user.uid + "/");
    userRef.child(billKey).remove();
  };

  handleCloseMobileAlert = () => {
    this.setState({ showMobileAlert: false, showSnackbar: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <TopAppBar
          photoURL={this.state.user ? this.state.user.photoURL : ""}
          login={this.handleLogin}
          logout={this.handleLogout}
        />
        <TopTabs changeHandler={this.tabChangeHandler} value={this.state.tab} loggedIn={Boolean(this.state.user)} />
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
            {this.state.tab === 2 && (
              <SavedBills
                bills={this.state.bills}
                convertTwoDecimal={this.convertTwoDecimal}
                updatePaidStatus={this.handleUpdatePaidStatus}
                deleteBill={this.handleDeleteBill}
              />
            )}
          </Grid>
        </div>
        <div className={classes.main_fab}>
          <FabController
            clicked={this.fabClickHandler}
            tab={this.state.tab}
            disabled={this.state.tab === 1 && !this.checkPersonsNotEmpty()}
            move={this.state.showSnackbar}
          />
        </div>
        <SaveBillDialog
          open={this.state.openSaveBillDialog}
          handleClose={() => {
            this.setState({ openSaveBillDialog: false });
          }}
          handleChange={this.handleBillSplitStateChange}
          handleSaveBill={this.handleSaveBill}
        />
        <MobileAlertSnackbar open={this.state.showMobileAlert} handleClose={this.handleCloseMobileAlert} />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Layout);
