import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormControlLabel,
  Typography
} from '@material-ui/core';
import { addQuestionAction, loadQuestionsAction } from './questionActions';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => {
  return {};
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
    const { dispatch, username } = this.props;
    const { optionOne, optionTwo } = this.state;

    if (optionOne === '') {
      return alert('You need to write something for Option One');
    }
    if (optionTwo === '') {
      return alert('You need to write something for Option Two');
    }

    dispatch(addQuestionAction(optionOne, optionTwo, username));
    this.setState({
      optionOne: '',
      optionTwo: ''
    });

    // redirect to dashboard
  };
  // Add two inputs

  // one input called optionOne the other optionTwo
  // handle the change with the method I created
  // handle the submit with the method I created
  // clear the form and redirect to dashboard
  render() {
    const { classes } = this.props;
    const { optionOne, optionTwo } = this.state;
    return (
      <div>
        <h2>Add New Question</h2>
        <Link to="/">Dashboard</Link>
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
    );
  }
}

const mapStateToProps = state => {
  const {
    authedUser: { username }
  } = state.login;

  return {
    username
  };
};

export default connect(mapStateToProps)(withStyles(styles)(NewQuestion));
