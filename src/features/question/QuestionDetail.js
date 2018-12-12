import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  RadioGroup,
  FormLabel,
  Radio,
  FormControlLabel,
  Typography
} from '@material-ui/core';

import { addAnswerAction } from '../user/userActions';
import { addAnswerQuestionAction } from './questionActions';

const styles = theme => {
  return {};
};

class QuestionDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: 'optionOne'
    };
  }

  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      answer: e.target.value
    });
  };
  handleClick = e => {
    e.preventDefault();
    const { answer } = this.state;
    const { dispatch, question, authedUser } = this.props;

    dispatch(addAnswerAction(question.id, answer));
    dispatch(addAnswerQuestionAction(authedUser.username, question.id, answer));
  };

  render() {
    const { loggedIn, question } = this.props;

    if (!loggedIn || Object.keys(question).length === 0) {
      return <Redirect to="/login" />;
    }

    const { classes, questionAnswered } = this.props;
    const { answer } = this.state;
    const { optionOne, optionTwo } = question;
    let votesOption1 = optionOne.votes.length;
    let votesOption2 = optionTwo.votes.length;
    let total = votesOption1 + votesOption2;

    return (
      <div>
        <h2>Question Detail</h2>
        <Link to="/">Dashboard</Link>
        {!questionAnswered ? (
          <form>
            <FormControl className={classes.block}>
              <FormLabel>Would You Rather...? Total Votes: {total}</FormLabel>
              <RadioGroup
                name="answer"
                onChange={this.handleChange}
                value={answer}
              >
                <FormControlLabel
                  value="optionOne"
                  control={<Radio />}
                  label={optionOne.text}
                />
                <FormControlLabel
                  value="optionTwo"
                  control={<Radio />}
                  label={optionTwo.text}
                />
              </RadioGroup>
            </FormControl>
            <br />
            <FormControl>
              <Button
                label="Submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={e => this.handleClick(e)}
                className={classes.submitButton}
              >
                Submit
              </Button>
            </FormControl>
          </form>
        ) : (
          <div>
            <Typography>Would You Rather...? Total Votes: {total}</Typography>
            <Typography>{`${optionOne.text} ${votesOption1}`}</Typography>
            <Typography>{`${optionTwo.text} ${votesOption2}`}</Typography>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  const question = state.question.questions ? state.question.questions[id] : {};
  const authedUser = state.login.authedUser ? state.login.authedUser : {};
  const { answers } = authedUser;

  let questionAnswered = answers ? id in answers : false;

  return {
    loggedIn: authedUser ? true : false,
    authedUser,
    questionAnswered,
    question
  };
};

export default connect(mapStateToProps)(withStyles(styles)(QuestionDetail));
