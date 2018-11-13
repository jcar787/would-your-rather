import Login from './Login';
import Register from './Register';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import { loginEpic, loginFailEpic, loginSuccessEpic } from './loginEpic';
import {
  registerEpic,
  registerFailEpic,
  registerSuccessEpic
} from './registerEpic';

const loginEpics = [loginEpic, loginFailEpic, loginSuccessEpic];
const registerEpics = [registerEpic, registerFailEpic, registerSuccessEpic];

export {
  Login,
  loginReducer,
  loginEpics,
  Register,
  registerReducer,
  registerEpics
};
