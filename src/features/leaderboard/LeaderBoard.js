import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Menu } from '../../components/menu';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';
import { loadUsersAction } from '../user/userActions';

class LeaderBoard extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadUsersAction());
  }

  render() {
    const { loggedIn } = this.props;

    if (!loggedIn) {
      return <Redirect to="/" />;
    }

    const { users, loading } = this.props;
    return (
      <React.Fragment>
        <Menu title="Leaderboard" loading={loading} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Username</TableCell>
              <TableCell>Questions</TableCell>
              <TableCell>Questions Answered</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => {
              const { username, questions, answers, avatarURL } = user;
              const total = questions.length + Object.keys(answers).length;
              return (
                <TableRow key={user.username}>
                  <TableCell>
                    <img
                      src={avatarURL}
                      style={{ width: '50px', height: '50px' }}
                      alt={username}
                    />
                  </TableCell>
                  <TableCell>{username}</TableCell>
                  <TableCell>{questions.length}</TableCell>
                  <TableCell>{Object.keys(answers).length}</TableCell>
                  <TableCell>{total}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const loggedIn = state.login.authedUser ? true : false;
  const usersObject = state.user.users ? state.user.users : {};
  const usersArray = Object.keys(usersObject).reduce((userArray, username) => {
    return [...userArray, usersObject[username]];
  }, []);
  const users = usersArray.sort((a, b) => {
    const totalA = a.questions.length + Object.keys(a.answers).length;
    const totalB = b.questions.length + Object.keys(b.answers).length;
    return totalB - totalA;
  });
  const loading = users.length > 0 ? true : false;

  return {
    users,
    loggedIn,
    loading
  };
};

export default connect(mapStateToProps)(LeaderBoard);
