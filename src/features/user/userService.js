import { _getUsers } from '../../utils/_DATA';
export const loadUsers = () => {
  // read users first from localStorage
  // read users from _DATA
  // merge the two sets of users
  return _getUsers().then(usersFromAPI => {
    const usersLocalStorage = JSON.parse(localStorage.getItem('users'));
    let users = [];
    if (usersLocalStorage) {
      users = [...usersLocalStorage];
    }
    users = [...users, ...usersFromAPI];
    localStorage.setItem('users', JSON.stringify(users));
    return users;
  });
};
