export const loginUser = (username, password) => {
  return new Promise((resolve, reject) => {
    console.log(username, password);
    if (username === 'jcar787' && password === 'testing') {
      resolve({ username });
    } else {
      reject('Bad Username or Password');
    }
  });
};
