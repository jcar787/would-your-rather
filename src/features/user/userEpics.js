import { ADD_ANSWER, ADD_QUESTION_USER, LOAD_USERS } from './userConstants';
import { loadUsers } from './userService';

import { from, of } from 'rxjs';
import {
  tap,
  ignoreElements,
  catchError,
  map,
  switchMap
} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { loadUsersResponseAction, loadUsersFailedAction } from './userActions';

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

export const addQuestionUserEpic = (action$, state$) => {
  return action$.pipe(
    ofType(ADD_QUESTION_USER),
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

export const loadUsersEpic = action$ => {
  return action$.pipe(
    ofType(LOAD_USERS),
    tap(() => console.log('loading users')),
    switchMap(() => {
      return from(loadUsers()).pipe(
        map(
          users => loadUsersResponseAction(users),
          catchError(err =>
            of(err).pipe(map(err => loadUsersFailedAction(err)))
          )
        )
      );
    })
  );
};
