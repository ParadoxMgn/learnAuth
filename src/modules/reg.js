import localUser from './localUser';
import users from './users';

const reg = (User) => {
  const btnReg = document.getElementById('btn-reg');
  const email = document.getElementById('email');
  const emailErr = document.getElementById('email-err');
  const password = document.getElementById('password');
  const passwordErr = document.getElementById('password-err');

  btnReg.addEventListener('click', e => {
    e.preventDefault();

    const userList = localUser(users()) || [];
    let check = true;

    if (email.value.trim() !== '') {
      if ((!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(email.value.trim()))) {
        check = false;
        emailErr.innerText = 'Введите корректный eMail';
      }

      if (userList.length > 0) {
        userList.forEach(item => {
          if (item.email === email.value.trim()) {
            check = false;
            alert('Пользователь с таким eMail уже зарегистрирован!');
          }
        });
      }
    } else {
      check = false;
      emailErr.innerText = 'Введите eMail';
      email.value = '';
    }

    if (password.value !== '') {
      if (password.value.length < 6) {
        check = false;
        passwordErr.innerText = 'Пароль должен содержать не менее 6 символов!';
      }
    } else {
      check = false;
      passwordErr.innerText = 'Введите пароль';
    }

    if (check) {
      const date = new Date();
      const dateReg = `${date.toLocaleDateString('ru')} в ${date.toLocaleTimeString('ru')}`;
      const index = userList.length;

      userList.push(new User(index, email.value, password.value, dateReg, 'user'));

      email.value = '';
      password.value = '';

      alert('Вы успешно зарегистрировались');
      localStorage.setItem('users', JSON.stringify(userList));
    }
  });
};

export default reg;