import { LOAD_QUESTIONS, ADD_QUESTION } from './questionConstants';

export const loadQuestionsAction = questions => {
  return {
    type: LOAD_QUESTIONS,
    questions
  };
};

export const addQuestionAction = question => {
  return {
    type: ADD_QUESTION,
    question
  };
};
