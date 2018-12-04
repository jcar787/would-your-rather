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

export const registerSuccessAction = () => {
  return {
    type: REGISTER_SUCCESS
  };
};

export const registerFailAction = error => {
  console.log(error);
  return {
    type: REGISTER_FAILED,
    error
  };
};
