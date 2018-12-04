import { combineEpics } from 'redux-observable';
import { loginEpics, registerEpics } from '../features/user';
import { questionEpics } from '../features/question';

const rootEpic = combineEpics(
  ...loginEpics,
  ...registerEpics,
  ...questionEpics
);

export default rootEpic;
