import localUser from './localUser';
import users from './users';
import exit from './exit';

const homePage = () => {
  const containerHome = document.querySelector('.container-home');
  const userList = localUser(users()) || [];

  if (containerHome) {
    userList.forEach(item => {
      item.start();
    });

    exit();
  }
};

export default homePage;