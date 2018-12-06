import Login from './Login';
import Register from './Register';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import userReducer from './userReducer';
import { loginEpic, loginFailEpic, loginSuccessEpic } from './loginEpic';
import { registerEpic } from './registerEpic';

const loginEpics = [loginEpic, loginFailEpic, loginSuccessEpic];
const registerEpics = [registerEpic];

export {
  Login,
  loginReducer,
  loginEpics,
  Register,
  registerReducer,
  registerEpics,
  userReducer
};
