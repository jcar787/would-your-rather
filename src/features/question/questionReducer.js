import {
  ADD_QUESTION,
  LOAD_QUESTIONS,
  LOAD_QUESTIONS_RESPONSE,
  LOAD_QUESTIONS_FAILED
} from './questionConstants';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUESTION:
      return {
        ...state,
        questions: {
          ...state.questions,
          [action.question.id]: { ...action.question }
        }
      };

    case LOAD_QUESTIONS:
      return {
        ...state,
        loading: true
      };

    case LOAD_QUESTIONS_RESPONSE:
      return {
        ...state,
        loading: false,
        questions: action.questions
      };

    case LOAD_QUESTIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};
