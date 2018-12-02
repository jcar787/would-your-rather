import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AnsweredQuestions, UnansweredQuestions } from '../question';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { answeredQuestions, unansweredQuestions } = this.props;
    return (
      <div>
        <h4>Home Page</h4>
        <AnsweredQuestions questions={answeredQuestions} />
        <UnansweredQuestions questions={unansweredQuestions} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const userQuestions = state.login.authedUser.questions;
  const questions = state.question.questions;
  const ownQuestions = userQuestions.map(questionId => questions[questionId]);
  const answerHolder = state.login.authedUser.answers;
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
    answeredQuestions,
    ownQuestions,
    unansweredQuestions
  };
};

export default connect(mapStateToProps)(Home);
