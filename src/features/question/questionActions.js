import {
  LOAD_QUESTIONS,
  ADD_QUESTION,
  LOAD_QUESTIONS_RESPONSE,
  LOAD_QUESTIONS_FAILED,
  ANSWER_QUESTION,
  SUBMIT_QUESTION
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

export const submitQuestionAction = (optionOneText, optionTwoText, author) => {
  const question = {
    author,
    optionOneText,
    optionTwoText
  };

  return {
    type: SUBMIT_QUESTION,
    question
  };
};

export const addQuestionAction = question => {
  return {
    type: ADD_QUESTION,
    question
  };
};
