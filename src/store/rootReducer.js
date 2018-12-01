import { combineReducers } from 'redux';
import {
  loginReducer as login,
  registerReducer as register
} from '../features/auth';

import { questionReducer as question } from '../features/question';

const rootReducer = combineReducers({ login, register, question });
export default rootReducer;
