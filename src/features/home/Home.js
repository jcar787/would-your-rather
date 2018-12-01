import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AnsweredQuestions, UnansweredQuestions } from '../question';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h4>Home Page</h4>
        <AnsweredQuestions />
        <UnansweredQuestions />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    answers: state.login.authedUser.answers,
    ownQuestions: state.login.authedUser.questions,
    questions: state.question.questions
  };
};

export default connect(mapStateToProps)(Home);
