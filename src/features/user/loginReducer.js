import {
  LOGIN_SUBMITED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT
} from './loginConstants';
import { ADD_ANSWER, ADD_QUESTION_USER } from './userConstants';

const authedUser = JSON.parse(localStorage.getItem('authedUser'));

const initialState = { authedUser };
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const { user } = action;
      return {
        ...state,
        loggingIn: false,
        authedUser: user
      };
    case LOGIN_SUBMITED:
      return { ...state, loggingIn: true };
    case LOGOUT:
      return { ...state, loggingIn: false, authedUser: null };
    case LOGIN_FAILED:
      const { error } = action;
      return { ...state, loggingIn: false, authedUser: null, error };
    case ADD_ANSWER:
      return {
        ...state,
        authedUser: {
          ...state.authedUser,
          answers: {
            ...state.authedUser.answers,
            [action.question.id]: action.question.option
          }
        }
      };
    case ADD_QUESTION_USER:
      console.log(action);
      return {
        ...state,
        authedUser: {
          ...state.authedUser,
          questions: [...state.authedUser.questions, action.questionId]
        }
      };
    default:
      return state;
  }
};
