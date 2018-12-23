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

import { saveUser } from './userService';
import { _saveQuestionAnswer } from '../../utils/_DATA';

export const addAnswerEpic = (action$, state$) => {
  return action$.pipe(
    ofType(ADD_ANSWER),
    switchMap(({ question: { id: qid, option } }) => {
      const {
        login: { authedUser }
      } = state$.value;
      console.log(option);
      const savePromise = saveUser(authedUser, qid, option);
      return from(savePromise).pipe(
        switchMap(() => {
          const {
            login: { authedUser }
          } = state$.value;
          return from(Promise.resolve(authedUser)).pipe(
            map(user => updateUserAction(user))
          );
        })
      );
    })
  );
};

export const addQuestionUserEpic = (action$, state$) => {
  return action$.pipe(
    ofType(ADD_QUESTION_USER),
    tap(() => {
      console.log(state$);
      //saveUserInLocalStorage(state$);
    }),
    ignoreElements()
  );
};

export const updateUserEpic = (action$, state$) => {
  return action$.pipe(
    ofType(UPDATE_USER),
    tap(() => {
      const {
        user: { users },
        login: { authedUser }
      } = state$.value;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('authedUser', JSON.stringify(authedUser));
    }),
    ignoreElements()
  );
};

export const loadUsersEpic = action$ => {
  return action$.pipe(
    ofType(LOAD_USERS),
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
