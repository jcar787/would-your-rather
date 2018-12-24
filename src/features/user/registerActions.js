import {
  REGISTER_SUBMITED,
  REGISTER_SUCCESS,
  REGISTER_FAILED
} from './registerConstants';

export const registerAction = (username, password) => {
  return {
    type: REGISTER_SUBMITED,
    user: {
      username,
      password
    }
  };
};

export const registerSuccessAction = message => {
  return {
    type: REGISTER_SUCCESS,
    message
  };
};

export const registerFailAction = message => {
  console.log(message);
  return {
    type: REGISTER_FAILED,
    message
  };
};
