import { saveUser, _getUsers } from '../../utils/_DATA';
export const registerUser = (username, password) => {
  return new Promise(async (resolve, reject) => {
    const user = {
      username,
      password,
      avatarURL: 'img/avatar.svg',
      answers: {},
      questions: []
    };
    const registerSuccess = saveUser(user);
    if (!registerSuccess) {
      reject('Username already exist');
    } else {
      const users = await _getUsers();
      localStorage.setItem('users', JSON.stringify(users));
      resolve();
    }
  });
};
