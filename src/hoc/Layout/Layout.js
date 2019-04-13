import React, {Component} from 'react';
import TopAppBar from '../../components/TopAppBar/TopAppBar';
import TipCalc from '../../components/TipCalc/TipCalc';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './LayoutStyles.js';
import Grid from '@material-ui/core/Grid';

//@material-ui imports

class Layout extends Component {
    render() {
    const {classes } = this.props;
        return (
            <React.Fragment>
                <TopAppBar />
                <div className={classes.tip_calc__container}>
                    <Grid container direction="row" alignContent="center" spacing={16}  className={classes.main_content}>
                    <TipCalc />
                    </Grid>
            </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Layout);