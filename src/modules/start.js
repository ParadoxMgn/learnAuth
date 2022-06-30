import localUser from './localUser';
import users from './users';

const start = () => {
  const userList = localUser(users()) || [];
  const User = users();
  const date = new Date();
  const dateReg = `${date.toLocaleDateString('ru')} в ${date.toLocaleTimeString('ru')}`;

  if (userList.length === 0) {
    userList.push(new User(0, 'admin@mail.ru', 'admin', dateReg, 'admin'));
  }

  localStorage.setItem('users', JSON.stringify(userList));
};

export default start;