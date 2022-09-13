import { createTheme} from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
        main: '#2b4826'
        
    },
    secondary :{
        main: '#DEA057'
    },
    error :{
      main: '#d32f2f'
    }
  },
  typography: {
    fontFamily: [
      "Oswald"
    ].join(",")
  }
});

export default theme;