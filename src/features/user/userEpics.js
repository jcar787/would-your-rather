import {
  ADD_ANSWER,
  ADD_QUESTION_USER,
  LOAD_USERS,
  UPDATE_USER
} from './userConstants';
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
import {
  loadUsersResponseAction,
  loadUsersFailedAction,
  updateUserAction
} from './userActions';

const saveUserInLocalStorage = state$ => {
  const {
    login: { authedUser }
  } = state$.value;
  localStorage.setItem('authedUser', JSON.stringify(authedUser));
};

export const addAnswerEpic = (action$, state$) => {
  return action$.pipe(
    ofType(ADD_ANSWER),
    tap(() => {
      saveUserInLocalStorage(state$);
    }),
    switchMap(() => {
      const {
        login: { authedUser }
      } = state$.value;
      console.log(authedUser);
      return from(Promise.resolve(authedUser)).pipe(
        map(user => updateUserAction(user))
      );
    })
  );
};

export const addQuestionUserEpic = (action$, state$) => {
  return action$.pipe(
    ofType(ADD_QUESTION_USER),
    tap(() => {
      console.log(state$);
      saveUserInLocalStorage(state$);
    }),
    ignoreElements()
  );
};

export const updateUserEpic = (action$, state$) => {
  return action$.pipe(
    ofType(UPDATE_USER),
    tap(() => {
      console.log('calling addUserToArrayEpic');
      const {
        user: { users }
      } = state$.value;
      localStorage.setItem('users', JSON.stringify(users));
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
