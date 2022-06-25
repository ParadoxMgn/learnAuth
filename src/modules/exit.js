import localUser from './localUser';
import users from './users';

const exit = () => {
  const indexPath = window.location.href.slice(0, window.location.href.lastIndexOf('/'));
  const index = indexPath + '/index.html';

  const btnExit = document.getElementById('btn-exit');

  btnExit.addEventListener('click', e => {
    e.preventDefault();
    const userList = localUser(users()) || [];

    userList.forEach(item => {
      if (item.auth) {
        item.auth = '';
        localStorage.setItem('users', JSON.stringify(userList));
        localStorage.setItem('auth', JSON.stringify(''));

        window.location.href = index;
      }
    });
  });

};

export default exit;