import Login from './Login';
import loginReducer from './loginReducer';
import { loginEpic, loginFailEpic, loginSuccessEpic } from './loginEpic';

const loginEpics = [loginEpic, loginFailEpic, loginSuccessEpic];

export { Login, loginReducer, loginEpics };
