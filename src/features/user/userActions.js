import { ADD_ANSWER } from './userConstants';

export const addAnswerAction = (id, option) => {
  return {
    type: ADD_ANSWER,
    question: { id, option }
  };
};
