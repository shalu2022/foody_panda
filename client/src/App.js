import Main from "./components.js/User/Main";
import { ThemeProvider } from '@mui/material/styles';
import theme from './components.js/theme';
import DataProvider from "./GlobalContext";


function App() {
  return (
    <DataProvider>
      <div className="App">
        <ThemeProvider theme={theme}>
          <Main />
        </ThemeProvider>
      </div>
    </DataProvider>

  );
}

export default App;
