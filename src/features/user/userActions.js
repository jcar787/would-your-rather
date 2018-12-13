import { ADD_ANSWER, ADD_QUESTION_USER } from './userConstants';

export const addAnswerAction = (id, option) => {
  return {
    type: ADD_ANSWER,
    question: { id, option }
  };
};

export const addQuestionUserAction = questionId => {
  console.log(questionId);
  return {
    type: ADD_QUESTION_USER,
    questionId
  };
};
