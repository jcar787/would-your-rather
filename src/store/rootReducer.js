import { combineReducers } from 'redux';
import {
  loginReducer as login,
  registerReducer as register
} from '../features/auth';

const rootReducer = combineReducers({ login, register });
export default rootReducer;
