import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, FormControl, FormLabel, Input } from '@material-ui/core';
import { submitQuestionAction, loadQuestionsAction } from './questionActions';
import withStyles from '@material-ui/core/styles/withStyles';
import { Menu } from '../../components/menu';

const styles = theme => {
  return {
    flexing: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '100px'
    }
  };
};

class NewQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionOne: '',
      optionTwo: ''
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadQuestionsAction());
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, username, history } = this.props;
    const { optionOne, optionTwo } = this.state;

    if (optionOne === '') {
      return alert('You need to write something for Option One');
    }
    if (optionTwo === '') {
      return alert('You need to write something for Option Two');
    }

    dispatch(submitQuestionAction(optionOne, optionTwo, username));
    this.setState({
      optionOne: '',
      optionTwo: ''
    });
    history.push('/');
  };

  render() {
    const { classes, isLoggedIn, loading } = this.props;
    const { optionOne, optionTwo } = this.state;

    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <Menu title="New Question" loading={loading} />
        <div className={classes.flexing}>
          <form>
            <FormControl className={classes.block}>
              <FormLabel>Would You Rather...? </FormLabel>
            </FormControl>
            <br />
            <FormControl className={classes.block}>
              <Input
                id="optionOne"
                placeholder="Please write option one"
                className={classes.input}
                onChange={e => this.handleChange(e)}
                value={optionOne}
              />
            </FormControl>
            <br />
            <FormControl className={classes.block}>
              <Input
                id="optionTwo"
                placeholder="Please write option two"
                className={classes.input}
                onChange={e => this.handleChange(e)}
                value={optionTwo}
              />
            </FormControl>
            <br />
            <FormControl>
              <Button
                label="Submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={e => this.handleSubmit(e)}
                className={classes.submitButton}
              >
                Submit
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  const {
    authedUser: { username }
  } =
    state.login && state.login.authedUser
      ? state.login
      : { authedUser: { username: null } };
  const isLoggedIn = state.login && state.login.authedUser ? true : false;
  const loading = username ? true : false;

  return {
    username,
    isLoggedIn,
    loading
  };
};

export default connect(mapStateToProps)(withStyles(styles)(NewQuestion));
