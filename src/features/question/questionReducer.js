import { ADD_QUESTION, LOAD_QUESTIONS } from './questionConstants';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUESTION:
      return {
        ...state,
        questions: {
          ...questions,
          [question.id]: { ...question }
        }
      };
    case LOAD_QUESTIONS:
      return {
        ...state,
        questions
      };
    default:
      return state;
  }
};
