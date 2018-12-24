import { from, of } from 'rxjs';
import {
  tap,
  ignoreElements,
  catchError,
  map,
  switchMap,
  mergeMap
} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { loadQuestions } from './questionService';
import {
  ADD_QUESTION,
  LOAD_QUESTIONS,
  ANSWER_QUESTION,
  SUBMIT_QUESTION
} from './questionConstants';
import {
  loadQuestionsResponseAction,
  loadQuestionsFailedAction,
  addQuestionAction
} from './questionActions';
import { addQuestionUserAction } from '../user/userActions';
import { _saveQuestion } from '../../utils/_DATA';

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
    ignoreElements()
  );
};

export const submitQuestionEpic = action$ => {
  return action$.pipe(
    ofType(SUBMIT_QUESTION),
    switchMap(({ question }) => {
      const savePromise = _saveQuestion(question);
      return from(savePromise).pipe(
        switchMap(question =>
          from(Promise.resolve(question)).pipe(
            mergeMap(question =>
              of(
                addQuestionUserAction(question.id),
                addQuestionAction(question)
              )
            )
          )
        )
      );
    })
  );
};

export const addAnswerQuestionEpic = (action$, state$) => {
  return action$.pipe(
    ofType(ANSWER_QUESTION),
    tap(() => {
      const {
        question: { questions }
      } = state$.value;
      localStorage.setItem('questions', JSON.stringify(questions));
    }),
    ignoreElements()
  );
};
