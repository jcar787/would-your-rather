import { from, of } from 'rxjs';
import {
  tap,
  ignoreElements,
  catchError,
  map,
  switchMap
} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { loadQuestions } from './questionService';
import {
  ADD_QUESTION,
  LOAD_QUESTIONS,
  ANSWER_QUESTION
} from './questionConstants';
import {
  addQuestionAction,
  loadQuestionsResponseAction,
  loadQuestionsFailedAction
} from './questionActions';

export const loadQuestionsEpic = action$ => {
  return action$.pipe(
    ofType(LOAD_QUESTIONS),
    tap(() => console.log('Loading Questions')),
    switchMap(() => {
      return from(loadQuestions()).pipe(
        map(
          questions => loadQuestionsResponseAction(questions),
          catchError(err =>
            of(err).pipe(map(err => loadQuestionsFailedAction(err)))
          )
        )
      );
    })
  );
};
