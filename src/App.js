import React, { Component } from "react";
import Layout from "./Containers/Layout/Layout";

//@material-ui imports
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from './ui/theme/index';
import CssBaseline from "@material-ui/core/CssBaseline";

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Layout />
            </MuiThemeProvider>
        );
    }
}

export default App;
