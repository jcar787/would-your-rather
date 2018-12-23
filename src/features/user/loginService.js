import { _getUsers, saveUser } from '../../utils/_DATA';

export const loginUser = (username, password) => {
  return new Promise(async (resolve, reject) => {
    // check localStorage first if nothing then call the backend
    const users = JSON.parse(localStorage.getItem('users'));
    if (!users) {
      users = await _getUsers();
    }

    const userFound = users[username] ? users[username] : false;
    if (userFound && userFound.password === password) {
      localStorage.setItem('authedUser', JSON.stringify(userFound));
      resolve(userFound);
    } else {
      reject('Bad Username or Password');
    }
  });
};
