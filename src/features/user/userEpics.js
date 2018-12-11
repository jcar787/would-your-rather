import { ADD_ANSWER } from './userConstants';

import { from, of } from 'rxjs';
import {
  tap,
  ignoreElements,
  catchError,
  map,
  switchMap
} from 'rxjs/operators';
import { ofType } from 'redux-observable';

export const addAnswerEpic = (action$, state$) => {
  return action$.pipe(
    ofType(ADD_ANSWER),
    tap(() => {
      console.log(state$);
      const {
        login: { authedUser }
      } = state$.value;
      console.log(authedUser);
      localStorage.setItem('authedUser', JSON.stringify(authedUser));
    }),
    ignoreElements()
  );
};
