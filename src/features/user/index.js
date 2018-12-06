import Login from './Login';
import Register from './Register';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import userReducer from './userReducer';
import { loginEpic, loginFailEpic, loginSuccessEpic } from './loginEpic';
import {
  registerEpic,
  registerFailEpic,
  registerSuccessEpic
} from './registerEpic';

//import { addAnswerEpic } from './userEpics';

const loginEpics = [loginEpic, loginFailEpic, loginSuccessEpic];
const registerEpics = [registerEpic, registerFailEpic, registerSuccessEpic];
//const userEpics = [addAnswerEpic];

export {
  Login,
  loginReducer,
  loginEpics,
  Register,
  registerReducer,
  registerEpics,
  userReducer
  //  userEpics
};
