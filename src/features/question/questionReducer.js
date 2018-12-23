import {
  ADD_QUESTION,
  ANSWER_QUESTION,
  LOAD_QUESTIONS,
  LOAD_QUESTIONS_RESPONSE,
  LOAD_QUESTIONS_FAILED,
  SUBMIT_QUESTION
} from './questionConstants';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case ANSWER_QUESTION:
      const { id } = action.question;
      const { username } = action.question;
      const { option } = action.question;
      const { questions } = state;
      return {
        ...state,
        questions: {
          ...questions,
          [id]: {
            ...questions[id],
            [option]: {
              ...questions[id][option],
              votes: [...questions[id][option].votes, username]
            }
          }
        }
      };
    case ADD_QUESTION:
      return {
        ...state,
        loadingQuestion: null,
        questions: {
          ...state.questions,
          [action.question.id]: { ...action.question }
        }
      };

    case SUBMIT_QUESTION:
      return {
        ...state,
        loadingQuestion: action.question
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
