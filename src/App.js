import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { Login, Register } from './features/user/';
import { Home } from './features/home';
import { NewQuestion, QuestionDetail } from './features/question';
import { LeaderBoard } from './features/leaderboard';
import theme from './config/theme';
import NotFound from './components/notfound';
import { loadQuestionsAction } from './features/question/questionActions';
import { loadUsersAction } from './features/user/userActions';
class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadQuestionsAction());
    dispatch(loadUsersAction());
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/login" exact={true} component={Login} />
            <Route path="/register" exact={true} component={Register} />
            <Route path="/add" exact={true} component={NewQuestion} />
            <Route path="/leaderboard" exact={true} component={LeaderBoard} />
            <Route
              path="/questions/:id"
              exact={true}
              component={QuestionDetail}
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default connect()(App);
