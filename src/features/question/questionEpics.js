import { from, of, Observable } from 'rxjs';
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
  loadQuestionsResponseAction,
  loadQuestionsFailedAction,
  addAnswerQuestionAction
} from './questionActions';
import { addQuestionUserAction } from '../user/userActions';

export const loadQuestionsEpic = action$ => {
  return action$.pipe(
    ofType(LOAD_QUESTIONS),
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

export const addQuestionEpic = (action$, state$) => {
  return action$.pipe(
    ofType(ADD_QUESTION),
    tap(() => {
      const {
        question: { questions }
      } = state$.value;
      localStorage.setItem('questions', JSON.stringify(questions));
    }),
    switchMap(({ question }) => {
      return from(Promise.resolve(question)).pipe(
        map(({ id }) => addQuestionUserAction(id))
      );
    })
    //ignoreElements()
  );
};

export const addAnswerQuestionEpic = (action$, state$) => {
  return action$.pipe(
    ofType(ANSWER_QUESTION),
    tap(() => {
      console.log(state$);
      const {
        question: { questions }
      } = state$.value;
      localStorage.setItem('questions', JSON.stringify(questions));
    }),
    ignoreElements()
  );
};
