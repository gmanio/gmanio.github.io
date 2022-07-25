// import { createTheme } from '@material-ui/core/
import { createTheme, ThemeOptions } from '@mui/material';
import * as Colors from '@mui/material/colors';
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: Colors.red.A400,
    },
  },
});

export default theme;
