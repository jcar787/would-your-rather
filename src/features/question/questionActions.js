import {
  LOAD_QUESTIONS,
  ADD_QUESTION,
  LOAD_QUESTIONS_RESPONSE,
  LOAD_QUESTIONS_FAILED
} from './questionConstants';

export const loadQuestionsAction = () => {
  return {
    type: LOAD_QUESTIONS
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

export const addQuestionAction = question => {
  return {
    type: ADD_QUESTION,
    question
  };
};
