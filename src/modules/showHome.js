import localUser from './localUser';
import users from './users';

const showHome = () => {
  const containerHome = document.querySelector('.container-home');
  const tBody = document.querySelector('tbody');

  const userList = localUser(users()) || [];

  if (containerHome) {
    tBody.innerHTML = '<tr><th>№ п/п</th><th>E-Mail</th><th class="td-btn">Редактирование</th></tr>';
    userList.forEach(item => {
      item.start();
    });
  }
};

export default showHome;