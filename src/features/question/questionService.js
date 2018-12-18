import { _getQuestions } from '../../utils/_DATA';
export const loadQuestions = () => {
  // check localStorage first
  // if there's data in localStorage return it
  // if there's not data in localStorage
  // call the API provided by udacity
  // save it in localStorage afterwards

  let questions = JSON.parse(localStorage.getItem('questions'));

  if (questions) {
    return Promise.resolve(questions);
  }

  return _getQuestions().then(questions => {
    console.log(questions);
    localStorage.setItem('questions', JSON.stringify(questions));
    return questions;
  });
};
