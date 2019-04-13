import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";

//@material-ui imports
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from './ui/theme/index';
import CssBaseline from "@material-ui/core/CssBaseline";

//@material-ui theme setup
// const theme = createMuiTheme({
//     typography: { useNextVariants: true },
//     palette: {
//         primary: blue,
//         secondary: {
//             main: "#ec407a"
//         }
//     }
// });

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
