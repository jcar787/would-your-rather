import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AnsweredQuestions, UnansweredQuestions } from '../question';
import { loadQuestionsAction } from '../question/questionActions';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => {
  return {
    questionHolder: {
      width: '40%',
      margin: '0 auto'
    },
    listHolder: {
      display: 'flex'
    },
    title: {
      margin: '50px auto',
      marginTop: '100px',
      width: '15%'
    }
  };
};

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { authedUser, dispatch } = this.props;

    if (authedUser) {
      dispatch(loadQuestionsAction());
    }
  }

  render() {
    const { authedUser } = this.props;

    if (!authedUser) {
      return <Redirect to="/login" />;
    }

    const { answeredQuestions, unansweredQuestions, classes } = this.props;

    console.log(unansweredQuestions);
    return (
      <React.Fragment>
        <h1 className={classes.title}>Home Page</h1>
        <div className={classes.listHolder}>
          <div className={classes.questionHolder}>
            <AnsweredQuestions
              questions={answeredQuestions}
              className="questions-box"
            />
          </div>
          <div className={classes.questionHolder}>
            <UnansweredQuestions
              questions={unansweredQuestions}
              className="questions-box"
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const authedUser = state.login.authedUser;
  const userQuestions = authedUser ? authedUser.questions : [];
  const questions = state.question.questions;
  const ownQuestions = userQuestions.map(questionId => questions[questionId]);
  const answerHolder = authedUser ? authedUser.answers : {};
  const answerKeys = Object.keys(answerHolder);
  const answeredQuestions = answerKeys.map(answerKey => {
    return { answer: answerHolder[answerKey], ...questions[answerKey] };
  });
  const questionKeys = questions ? Object.keys(questions) : [];
  const unansweredQuestions = questionKeys
    .filter(
      questionKey => !answerKeys.find(answerKey => answerKey === questionKey)
    )
    .map(questionKey => questions[questionKey]);

  return {
    authedUser,
    answeredQuestions,
    ownQuestions,
    unansweredQuestions
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Home));
