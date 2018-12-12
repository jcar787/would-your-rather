import uuidv4 from 'uuid/v4';
import {
  LOAD_QUESTIONS,
  ADD_QUESTION,
  LOAD_QUESTIONS_RESPONSE,
  LOAD_QUESTIONS_FAILED,
  ANSWER_QUESTION
} from './questionConstants';

export const loadQuestionsAction = () => {
  return {
    type: LOAD_QUESTIONS
  };
};

export const addAnswerQuestionAction = (username, id, option) => {
  return {
    type: ANSWER_QUESTION,
    question: {
      id,
      username,
      option
    }
  };
};

export const loadQuestionsResponseAction = questions => {
  return {
    type: LOAD_QUESTIONS_RESPONSE,
    questions
  };
};

export const loadQuestionsFailedAction = error => {
  return {
    type: LOAD_QUESTIONS_FAILED,
    error
  };
};

export const addQuestionAction = (optionOne, optionTwo, author) => {
  const question = {
    id: uuidv4(),
    author,
    timestamp: Date.now(),
    optionOne: {
      text: optionOne,
      votes: []
    },
    optionTwo: {
      text: optionTwo,
      votes: []
    }
  };
  return {
    type: ADD_QUESTION,
    question
  };
};
