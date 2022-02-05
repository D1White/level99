import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { grey, blueGrey, teal } from '@mui/material/colors';

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: blueGrey,
    secondary: grey,
  },
});

theme = responsiveFontSizes(theme);

export default theme;
