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
  REGISTER_SUBMITED,
  REGISTER_SUCCESS,
  REGISTER_FAILED
} from './registerConstants';
import { registerUser } from './registerService';
import { registerSuccessAction, registerFailAction } from './registerActions';

export const registerSuccessEpic = action$ => {
  return action$.pipe(
    ofType(REGISTER_SUCCESS),
    tap(() => console.log('Register succesful')),
    ignoreElements()
  );
};

export const registerFailEpic = action$ => {
  return action$.pipe(
    ofType(REGISTER_FAILED),
    tap(() => console.log('Register Failed')),
    ignoreElements()
  );
};
export const registerEpic = action$ => {
  return action$.pipe(
    ofType(REGISTER_SUBMITED),
    switchMap(({ user: { username, password } }) => {
      console.log(username, password);
      const userPro = registerUser(username, password);
      const ob$ = from(userPro);
      return ob$.pipe(
        map(user => registerSuccessAction(user)),
        catchError(error =>
          of(error).pipe(map(error => registerFailAction(error)))
        )
      );
    })
  );
};
