import { combineReducers } from 'redux';
import { loginReducer as login } from '../features/login';
const rootReducer = combineReducers({ login });
export default rootReducer;
