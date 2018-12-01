import { combineEpics } from 'redux-observable';
import { loginEpics, registerEpics } from '../features/auth';
import { questionEpics } from '../features/question';

const rootEpic = combineEpics(
  ...loginEpics,
  ...registerEpics,
  ...questionEpics
);

export default rootEpic;
