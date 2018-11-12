import { combineEpics } from 'redux-observable';
import { loginEpics } from '../features/login';

const rootEpic = combineEpics(...loginEpics);

export default rootEpic;
