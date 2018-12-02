import {
  LOGIN_SUBMITED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT
} from './loginConstants';

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
    default:
      return state;
  }
};
