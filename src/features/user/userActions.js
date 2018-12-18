import {
  ADD_ANSWER,
  ADD_QUESTION_USER,
  LOAD_USERS,
  LOAD_USERS_RESPONSE,
  LOAD_USERS_FAILED
} from './userConstants';

export const addAnswerAction = (id, option) => {
  return {
    type: ADD_ANSWER,
    question: { id, option }
  };
};

export const loadUsersAction = () => {
  return {
    type: LOAD_USERS
  };
};

export const loadUsersFailedAction = () => {
  return {
    type: LOAD_USERS_FAILED
  };
};

export const loadUsersResponseAction = users => {
  return {
    type: LOAD_USERS_RESPONSE,
    users
  };
};

export const addQuestionUserAction = questionId => {
  console.log(questionId);
  return {
    type: ADD_QUESTION_USER,
    questionId
  };
};
