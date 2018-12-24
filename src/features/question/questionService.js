import { _getQuestions } from '../../utils/_DATA';
export const loadQuestions = () => {
  return _getQuestions().then(questions => {
    let questionsLS = JSON.parse(localStorage.getItem('questions'));
    questions = { ...questionsLS, ...questions };

    localStorage.setItem('questions', JSON.stringify(questions));
    return questions;
  });
};
