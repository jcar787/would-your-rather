import { combineEpics } from 'redux-observable';
import { loginEpics, registerEpics } from '../features/auth';

const rootEpic = combineEpics(...loginEpics, ...registerEpics);

export default rootEpic;
