import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(props);
    return <div>Home Page</div>;
  }
}

const mapStateToProps = state => {
  return {
    answers: state.authedUser.answers,
    ownQuestions: state.authedUser.questions,
    questions: state.question.questions
  };
};

export default Home;
