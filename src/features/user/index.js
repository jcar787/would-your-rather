import Login from './Login';
import Register from './Register';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import userReducer from './userReducer';
import { loginEpic, loginSuccessEpic, logoutEpic } from './loginEpic';
import { registerEpic } from './registerEpic';
import {
  addAnswerEpic,
  addQuestionUserEpic,
  loadUsersEpic,
  updateUserEpic
} from './userEpics';

const loginEpics = [loginEpic, loginSuccessEpic, logoutEpic];
const registerEpics = [registerEpic];
const userEpics = [
  addAnswerEpic,
  addQuestionUserEpic,
  loadUsersEpic,
  updateUserEpic
];

export {
  Login,
  loginReducer,
  loginEpics,
  Register,
  registerReducer,
  registerEpics,
  userReducer,
  userEpics
};
