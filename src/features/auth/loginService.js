export const loginUser = (username, password) => {
  return new Promise((resolve, reject) => {
    console.log(username, password);
    const users = JSON.parse(localStorage.getItem('users'));
    const userFound = users.find(
      user => user.username === username && user.password === password
    );
    if (userFound) {
      resolve({ username });
    } else {
      reject('Bad Username or Password');
    }
  });
};
