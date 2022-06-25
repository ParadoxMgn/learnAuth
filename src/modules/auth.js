import localUser from './localUser';
import users from './users';

const auth = () => {
  const indexPath = window.location.href.slice(0, window.location.href.lastIndexOf('/'));
  const home = indexPath + '/home.html';

  const btnAuth = document.getElementById('btn-auth');
  const email = document.getElementById('email');
  const emailErr = document.getElementById('email-err');
  const password = document.getElementById('password');
  const passwordErr = document.getElementById('password-err');


  btnAuth.addEventListener('click', e => {
    e.preventDefault();
    const userList = localUser(users()) || [];
    let check = true;

    if (email.value.trim() !== '') {
      if ((!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(email.value.trim()))) {
        check = false;
        emailErr.innerText = 'Введите корректный eMail';
      }
    } else {
      check = false;
      emailErr.innerText = 'Введите eMail';
      email.value = '';
    }

    if (password.value === '') {
      check = false;
      passwordErr.innerText = 'Введите пароль';
    }

    if (check) {
      if (userList.length > 0) {
        userList.forEach(item => {
          if (item.email === email.value.trim()) {
            check = false;
            if (item.password === password.value) {
              item.auth = '1';
              localStorage.setItem('auth', JSON.stringify(item.email));
              localStorage.setItem('users', JSON.stringify(userList));

              window.location.href = home;
            } else {
              password.value = '';
              alert('Вы ввели неверный пароль! Попробуйте снова!');
            }
          }
        });
        if (check) {
          alert('Пользователя с таким eMail не существует! Зарегистрируйтесь!');
        }
      } else {
        alert('Пользователя с таким eMail не существует! Зарегистрируйтесь!');
      }
    }
  });
};

export default auth;