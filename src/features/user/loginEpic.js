import { from, of } from 'rxjs';
import {
  tap,
  ignoreElements,
  catchError,
  map,
  switchMap
} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { LOGIN_SUBMITED, LOGIN_FAILED, LOGIN_SUCCESS } from './loginConstants';
import { loginUser } from './loginService';
import { loginFailAction, loginSuccessAction } from './loginActions';
import { loadQuestionsAction } from '../question/questionActions';

export const loginSuccessEpic = action$ => {
  return action$.pipe(
    ofType(LOGIN_SUCCESS),
    tap(() => console.log('Login succesful')),
    map(() => loadQuestionsAction())
  );
};

export const loginFailEpic = action$ => {
  return action$.pipe(
    ofType(LOGIN_FAILED),
    tap(() => console.log('Login Failed')),
    ignoreElements()
  );
};

export const loginEpic = action$ => {
  return action$.pipe(
    ofType(LOGIN_SUBMITED),
    switchMap(({ login: { username, password } }) => {
      const user = loginUser(username, password);
      const ob$ = from(user);
      return ob$.pipe(
        map(user => loginSuccessAction(user)),
        catchError(error =>
          of(error).pipe(map(error => loginFailAction(error)))
        )
      );
    })
  );
};
