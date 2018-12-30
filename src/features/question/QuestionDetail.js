import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  RadioGroup,
  FormLabel,
  Radio,
  FormControlLabel,
  Typography,
  LinearProgress
} from '@material-ui/core';
import Menu from '../../components/menu/Menu';
import { addAnswerAction, loadUsersAction } from '../user/userActions';
import {
  addAnswerQuestionAction,
  loadQuestionsAction
} from './questionActions';

const styles = theme => {
  return {
    flexing: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '100px'
    },
    result: {
      marginTop: '25px'
    },
    or: {
      marginTop: '30px'
    },
    graph: {
      marginTop: '5px'
    },
    image: {
      width: '35px',
      height: '35px'
    }
  };
};

class QuestionDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: 'optionOne'
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadQuestionsAction());
    dispatch(loadUsersAction());
  }

  handleChange = e => {
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
    const { loggedIn, question, loadingQuestions } = this.props;

    if (!loggedIn) {
      return <Redirect to="/login" />;
    }

    if (Object.keys(question).length === 0 && loadingQuestions === false) {
      return <Redirect to="/error" />;
    }

    const {
      classes,
      questionAnswered,
      loading,
      actualAnswer,
      avatarURL,
      history
    } = this.props;

    console.log(loadingQuestions);
    if (loadingQuestions === false) {
      const { answer } = this.state;
      const { optionOne, optionTwo, author } = question;
      let votesOption1 = optionOne.votes.length;
      let votesOption2 = optionTwo.votes.length;
      let total = votesOption1 + votesOption2;

      return (
        <React.Fragment>
          <Menu
            title="Would You Rather...?"
            loading={loading}
            history={history}
          />
          <div className={classes.flexing}>
            {!questionAnswered ? (
              <form>
                <FormControl className={classes.block}>
                  <FormLabel>
                    <Typography variant="h3">
                      <img
                        src={`/${avatarURL}`}
                        alt={author}
                        className={classes.image}
                      />{' '}
                      Would You Rather...? Total Votes: {total}
                    </Typography>
                  </FormLabel>
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
                <Typography variant="h3">
                  <img
                    src={`/${avatarURL}`}
                    alt={author}
                    className={classes.image}
                  />{' '}
                  Would You Rather...? Total Votes: {total}
                </Typography>
                <div>
                  <Typography variant="h4" className={classes.result}>{`${
                    actualAnswer === 'optionOne'
                      ? `You voted for: ${optionOne.text}`
                      : optionOne.text
                  } ${votesOption1}`}</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={(votesOption1 / total) * 100}
                    className={classes.graph}
                  />
                </div>
                <Typography variant="h4" className={classes.or}>
                  OR
                </Typography>
                <div>
                  <Typography variant="h4" className={classes.result}>{`${
                    actualAnswer === 'optionTwo'
                      ? `You voted for: ${optionTwo.text}`
                      : optionTwo.text
                  } ${votesOption2}`}</Typography>
                  <LinearProgress
                    variant="determinate"
                    color="secondary"
                    value={(votesOption2 / total) * 100}
                    className={classes.graph}
                  />
                </div>
              </div>
            )}
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Menu
            title="Would You Rather...?"
            loading={false}
            history={history}
          />
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  const question = state.question.questions ? state.question.questions[id] : {};
  const authedUser = state.login.authedUser ? state.login.authedUser : {};
  const { answers } = authedUser;
  const { avatarURL } =
    state.user.users && question.author
      ? state.user.users[question.author]
      : { avatarURL: '' };

  let questionAnswered = answers ? id in answers : false;

  const loading = authedUser && question ? true : false;
  const actualAnswer = questionAnswered ? answers[id] : null;
  const loadingQuestions =
    state.question.loading !== null || state.question.loading !== undefined
      ? state.question.loading
      : null;

  return {
    loggedIn: authedUser ? true : false,
    authedUser,
    questionAnswered,
    question,
    loading,
    actualAnswer,
    avatarURL,
    loadingQuestions
  };
};

export default connect(mapStateToProps)(withStyles(styles)(QuestionDetail));
