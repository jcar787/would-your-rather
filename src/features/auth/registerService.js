export const registerUser = (username, password) => {
  return new Promise((resolve, reject) => {
    let users = JSON.parse(localStorage.getItem('users'));
    users = users && users.length > 0 ? users : [];
    console.log(users);
    let userExists = false;
    if (users.length === 0) {
      users = [{ username, password }];
    } else {
      userExists = users.find(user => user.username === username);
      if (!userExists) {
        users = [...users, { username, password }];
      }
    }
    localStorage.setItem('users', JSON.stringify(users));
    if (userExists) {
      reject('Username already exists');
    } else {
      resolve();
    }
  });
};
