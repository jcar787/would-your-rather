import NewQuestion from './NewQuestion';
import { loadQuestionsEpic } from './questionEpics';
import questionReducer from './questionReducer';
import AnsweredQuestions from './AnsweredQuestions';
import UnansweredQuestions from './UnansweredQuestions';
import Question from './Question';
import QuestionDetail from './QuestionDetail';

const questionEpics = [loadQuestionsEpic];

export {
  NewQuestion,
  questionEpics,
  questionReducer,
  AnsweredQuestions,
  UnansweredQuestions,
  Question,
  QuestionDetail
};
