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

/*export const addAnswerEpic = action$ => {
  return action$.pipe(
    ofType(ADD_ANSWER),
    map(({ question: { id, option } }) => {
      console.log(id, option);
    }),
    ignoreElements()
  );
};
*/
