import { combineReducers } from 'redux';
import {
  loginReducer as login,
  registerReducer as register,
  userReducer as user
} from '../features/user';

import { questionReducer as question } from '../features/question';

const rootReducer = combineReducers({ login, register, user, question });
export default rootReducer;
