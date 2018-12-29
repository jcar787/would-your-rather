import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AnsweredQuestions, UnansweredQuestions } from '../question';
import { loadQuestionsAction } from '../question/questionActions';
import withStyles from '@material-ui/core/styles/withStyles';
import Menu from '../../components/menu/Menu';
import { loadUsersAction } from '../user/userActions';
import { Button } from '@material-ui/core';
import AddButton from '../../components/buttons/AddButton';

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
    },
    flexing: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '25px'
    }
  };
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areUnansweredShowing: true
    };
  }

  componentDidMount() {
    const { authedUser, dispatch } = this.props;

    if (authedUser) {
      dispatch(loadQuestionsAction());
      dispatch(loadUsersAction());
    }
  }

  onClick = e => {
    e.preventDefault();
    const { areUnansweredShowing } = this.state;

    this.setState({
      areUnansweredShowing: !areUnansweredShowing
    });
  };

  render() {
    const { loggedIn } = this.props;

    if (!loggedIn) {
      return <Redirect to="/login" />;
    }

    const { areUnansweredShowing } = this.state;

    const {
      answeredQuestions,
      unansweredQuestions,
      classes,
      questionsLoaded,
      history
    } = this.props;

    return (
      <React.Fragment>
        <Menu title={`Home`} loading={questionsLoaded} history={history} />
        <div className={classes.flexing}>
          <Button onClick={this.onClick}>{`Show ${
            areUnansweredShowing ? 'Answered Questions' : 'Unanswered Questions'
          }`}</Button>
        </div>
        {questionsLoaded ? (
          <React.Fragment>
            <div className={classes.listHolder}>
              {areUnansweredShowing ? (
                <div className={classes.questionHolder}>
                  <UnansweredQuestions
                    questions={unansweredQuestions}
                    className="questions-box"
                  />
                </div>
              ) : (
                <div className={classes.questionHolder}>
                  <AnsweredQuestions
                    questions={answeredQuestions}
                    className="questions-box"
                  />
                </div>
              )}
              <AddButton />
            </div>
          </React.Fragment>
        ) : (
          <h3>Loading Questions</h3>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const loggedIn = state.login.authedUser ? true : false;
  const authedUser = state.login.authedUser;
  const userQuestions = authedUser ? authedUser.questions : [];
  const questions = state.question.questions ? state.question.questions : {};
  const ownQuestions = userQuestions.map(questionId => questions[questionId]);
  const answerHolder = authedUser ? authedUser.answers : {};
  const answerKeys = Object.keys(answerHolder);
  const answeredQuestions = answerKeys
    .map(answerKey => {
      const date =
        questions[answerKey] && questions[answerKey].timestamp
          ? new Date(questions[answerKey].timestamp).toLocaleDateString()
          : new Date().toLocaleDateString();
      return {
        answer: answerHolder[answerKey],
        ...questions[answerKey],
        date
      };
    })
    .sort((a, b) => b.timestamp - a.timestamp);
  const questionKeys = questions ? Object.keys(questions) : [];
  const unansweredQuestions = questionKeys
    .filter(
      questionKey => !answerKeys.find(answerKey => answerKey === questionKey)
    )
    .map(questionKey => {
      const date = new Date(
        questions[questionKey].timestamp
      ).toLocaleDateString();
      return { ...questions[questionKey], date };
    })
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    authedUser,
    loggedIn,
    answeredQuestions,
    ownQuestions,
    unansweredQuestions,
    questionsLoaded: Object.keys(questions).length > 0
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Home));
