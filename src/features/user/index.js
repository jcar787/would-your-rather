import Login from './Login';
import Register from './Register';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import userReducer from './userReducer';
import { loginEpic, loginSuccessEpic } from './loginEpic';
import { registerEpic } from './registerEpic';
import { addAnswerEpic, addQuestionUserEpic } from './userEpics';

const loginEpics = [loginEpic, loginSuccessEpic];
const registerEpics = [registerEpic];
const userEpics = [addAnswerEpic, addQuestionUserEpic];

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
