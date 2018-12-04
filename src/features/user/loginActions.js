import {
  LOGIN_SUBMITED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT
} from './loginConstants';

export const loginAction = (username, password) => {
  return {
    type: LOGIN_SUBMITED,
    login: {
      username,
      password
    }
  };
};

export const loginSuccessAction = user => {
  return {
    type: LOGIN_SUCCESS,
    user
  };
};

export const loginFailAction = error => {
  return {
    type: LOGIN_FAILED,
    error
  };
};

export const logoutAction = () => {
  return {
    type: LOGOUT
  };
};
