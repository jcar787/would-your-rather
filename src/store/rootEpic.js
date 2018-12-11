import { combineEpics } from 'redux-observable';
import { loginEpics, registerEpics, userEpics } from '../features/user';
import { questionEpics } from '../features/question';

const rootEpic = combineEpics(
  ...loginEpics,
  ...registerEpics,
  ...questionEpics,
  ...userEpics
);

export default rootEpic;
