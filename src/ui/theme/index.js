// File used by App.js to set the material-ui theme for the site.

import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';

const palette = {
  primary: blue,
  secondary: orange
};
const themeName = 'Dodger Blue Froly Fisher';

export default createMuiTheme({ palette, themeName, typography: {
    useNextVariants: true, }});