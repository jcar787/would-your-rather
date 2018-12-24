import { _getUsers, _saveQuestionAnswer, saveUsers } from '../../utils/_DATA';
export const loadUsers = () => {
  return _getUsers().then(users => {
    const usersLocalStorage = JSON.parse(localStorage.getItem('users'));
    users = { ...usersLocalStorage, ...users };
    saveUsers(users);
    localStorage.setItem('users', JSON.stringify(users));
    return users;
  });
};

export const saveUser = (authedUser, qid, answer) => {
  return _saveQuestionAnswer({
    authedUser: authedUser.username,
    qid,
    answer
  });
};
