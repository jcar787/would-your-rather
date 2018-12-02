export const loginUser = (username, password) => {
  return new Promise((resolve, reject) => {
    const users = JSON.parse(localStorage.getItem('users'));
    const userFound = users.find(
      user => user.username === username && user.password === password
    );
    if (userFound) {
      localStorage.setItem('authedUser', JSON.stringify(userFound));
      resolve(userFound);
    } else {
      reject('Bad Username or Password');
    }
  });
};
