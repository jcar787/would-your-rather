import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { Login } from './features/login/';
import { Home } from './features/home';
import { NewQuestion } from './features/newQuestion';
import { LeaderBoard } from './features/leaderboard';
import { Menu } from './components/menu/';
import theme from './config/theme';
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Menu />
        <BrowserRouter>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/login" exact={true} component={Login} />
            <Route path="/new" exact={true} component={NewQuestion} />
            <Route path="/leaderboard" exact={true} component={LeaderBoard} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
