import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

// Components
import Navbar from './components/navbar';

// Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#534bae',
      main: '#1a237e',
      dark: '#000051',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#8e99f3',
      main: '#5c6bc0',
      dark: '#26418f',
      contrastText: '#ffffff'
    }
  },
  typography: {
    useNextVariants: true
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar/>
            <div className="container">
              <Switch>
                <Route exact path ="/" component={home} />
                <Route exact path ="/login" component={login} />
                <Route exact path ="/signup" component={signup} />
              </Switch>
             </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
