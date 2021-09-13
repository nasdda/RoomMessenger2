import './App.css';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles'
import Router from './router/router'

const theme = createTheme({
  palette: {
    primary: {
      main: "#673ab7",
    },
    secondary: {
      main: '#f44336',
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: "100%" }}>
        <Router />
      </div>
    </ThemeProvider>
  );
}

export default App;
