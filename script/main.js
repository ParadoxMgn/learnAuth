'use strict';

const indexPath = window.location.href.slice(0, window.location.href.lastIndexOf('/'));

const index = indexPath + '/index.html';
const home = indexPath + '/home.html';

const userList = [];
const localUserList = JSON.parse(localStorage.getItem('users')) || [];
let authEMail = JSON.parse(localStorage.getItem('auth')) || '';

const containerIndex = document.querySelector('.container-index');
const containerHome = document.querySelector('.container-home');
const btnAuth = document.getElementById('btn-auth');
const btnReg = document.getElementById('btn-reg');
const email = document.getElementById('email');
const password = document.getElementById('password');
const btnExit = document.getElementById('btn-exit');
const textEmail = document.getElementById('text-email');
const textDate = document.getElementById('text-date');
const tBody = document.querySelector('tbody');
const popup = document.getElementById('popup');
const popupClose = document.getElementById('popup_close');
const popupBody = document.getElementById('popup__body');
const popupEmail = document.getElementById('popup__email');
const popupPassword = document.getElementById('popup__password');
const popupPasswordCheck = document.getElementById('popup__password-check');
const popupBtnSave = document.getElementById('popup__btn-save');
const popupEmailErr = document.getElementById('popup__email-err');
const popupPasswordErr = document.getElementById('popup__password-err');
const textErr = document.getElementById('text-err');
const emailErr = document.getElementById('email-err');
const passwordErr = document.getElementById('password-err');

const auth = e => {
  e.preventDefault();
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
};

const reg = e => {
  e.preventDefault();
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
    const dateNow = new Intl.DateTimeFormat().format(date);

    if (userList > 0) {
      userList.push(new User(userList.length, email.value, password.value, dateNow));
    } else {
      const index = 0;
      userList.push(new User(index, email.value, password.value, dateNow));
    }


    email.value = '';
    password.value = '';

    alert('Вы успешно зарегистрировались');
    localStorage.setItem('users', JSON.stringify(userList));
  }
};

const exit = e => {
  e.preventDefault();

  userList.forEach(item => {
    if (item.auth) {
      item.auth = '';
      authEMail = '';
      localStorage.setItem('users', JSON.stringify(userList));
      localStorage.setItem('auth', JSON.stringify(''));

      window.location.href = index;
    }
  });
};

class User {
  constructor(index, email, password, dateNow, auth = '') {
    this.index = index;
    this.email = email;
    this.password = password;
    this.auth = auth;
    this.dateNow = dateNow;
  }
  start() {
    this.show();

    if (this.auth) {
      tBody.querySelector('#btn-cahge').addEventListener('click', this.openChange.bind(this));
      popupClose.addEventListener('click', this.closeChange.bind(this));
      popupBtnSave.addEventListener('click', this.change.bind(this));
      popupPasswordCheck.addEventListener('input', () => {
        if (popupPasswordCheck.value !== popupPassword.value) {
          textErr.innerText = 'Пароли не совпадают';
        } else {
          textErr.innerText = '';
        }
      });
      popupPassword.addEventListener('input', () => {
        if ((popupPasswordCheck.value !== popupPassword.value) && popupPasswordCheck.value.length > 0) {
          textErr.innerText = 'Пароли не совпадают';
        } else {
          textErr.innerText = '';
        }
      });
    }
  }
  show() {

    if (this.auth) {
      textEmail.innerText = this.email;
      textDate.innerText = this.dateNow;
    }
    tBody.insertAdjacentHTML('beforeend', `<tr>
    <td>${this.index + 1}</td>
    <td>${this.email}</td>
    <td>${this.auth ? `<button class="btn" id="btn-cahge">Редактировать данные</button>` : ''}</td>
    </tr>`);
  }
  openChange(e) {
    e.preventDefault();

    popupEmail.value = '';
    popupPassword.value = '';
    popupPasswordCheck.value = '';
    popupEmail.placeholder = 'Введите новый email';
    popupPassword.placeholder = 'Введите новый пароль';
    popupPasswordCheck.placeholder = 'Повторите пароль';
    popupEmailErr.innerText = '';
    popupPasswordErr.innerText = '';
    textErr.innerText = '';
    popup.style.zIndex = '3';
    popup.style.visibility = 'visible';

    popupEmail.addEventListener('focus', () => {
      const placeholder = popupEmail.placeholder;

      popupEmail.placeholder = '';
      popupEmailErr.innerText = '';
      popupEmail.addEventListener('blur', () => {
        popupEmail.placeholder = placeholder;
      });
    });

    popupPassword.addEventListener('focus', () => {
      const placeholder = popupPassword.placeholder;

      popupPassword.placeholder = '';
      popupPasswordErr.innerText = '';
      popupPassword.addEventListener('blur', () => {
        popupPassword.placeholder = placeholder;
      });
    });

    popupPasswordCheck.addEventListener('focus', () => {
      const placeholder = popupPasswordCheck.placeholder;

      popupPasswordCheck.placeholder = '';
      textErr.innerText = '';
      popupPasswordCheck.addEventListener('blur', () => {
        popupPasswordCheck.placeholder = placeholder;
      });
    });
  }
  closeChange(e) {
    e.preventDefault();

    popup.style.zIndex = '1';
    popup.style.visibility = 'hidden';
  }

  change(e) {
    e.preventDefault();
    let check = true;
    let checkMail = true;
    let checkPass = true;

    if (this.email === authEMail) {
      if (popupEmail.value.trim() !== '') {
        if ((!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(popupEmail.value.trim()))) {
          check = false;
          popupEmailErr.innerText = 'Введите корректный eMail';
        }

        userList.forEach(item => {
          if (item.email !== this.email) {
            if (item.email === popupEmail.value.trim()) {
              check = false;
              alert('Пользователь с таким eMail уже зарегистрирован!');
            }
          }
        });
      }

      if (popupPassword.value !== '') {
        if (popupPassword.value.length < 6) {
          check = false;
          popupPasswordErr.innerText = 'Пароль должен содержать не менее 6 символов!';
        }
      }

      if (check) {
        if (checkMail) {
          if (popupEmail.value.trim() !== '') {
            this.email = popupEmail.value;
            authEMail = popupEmail.value;
            checkMail = false;
          }
        }
        if (checkPass) {
          if (popupPassword.value !== '') {
            if (popupPassword.value === popupPasswordCheck.value) {
              this.password = popupPassword.value;
              checkPass = false;
            } else {
              textErr.innerText = 'Пароли не совпадают';
            }
          }

        }

        if (popupEmail.value.trim() !== '' || popupPassword.value !== '') {
          popup.style.zIndex = '1';
          popup.style.visibility = 'hidden';
          localStorage.setItem('users', JSON.stringify(userList));
          localStorage.setItem('auth', JSON.stringify(authEMail));
          tBody.innerHTML = '<tr><th>№ п/п</th><th>E-Mail</th><th class="td-btn"></th></tr>';

          userList.forEach(item => {
            item.start();
          });
        }
        if (!checkMail) {
          alert('EMail успешно изменен!');
        }
        if (!checkPass) {
          alert('Пароль успешно изменен!');
        }
      }
    }
  }
}

if (localUserList.length > 0) {
  localUserList.forEach((item, index) => {
    userList.push(new User(index, item.email, item.password, item.dateNow, item.auth));
  });
  localStorage.setItem('users', JSON.stringify(userList));
}

if (window.location.href === home) {
  if (authEMail !== '') {
    tBody.innerHTML = '<tr><th>№ п/п</th><th>E-Mail</th><th class="td-btn"></th></tr>';
    userList.forEach(item => {
      item.start();
    });

    btnExit.addEventListener('click', exit);
  } else {
    window.location.href = index;
  }
}

if (window.location.href === index) {
  if (authEMail !== '') {
    window.location.href = home;
  }

  btnAuth.addEventListener('click', auth);
  btnReg.addEventListener('click', reg);

  email.addEventListener('focus', () => {
    const placeholder = email.placeholder;

    email.placeholder = '';
    emailErr.innerText = '';
    email.addEventListener('blur', () => {
      email.placeholder = placeholder;
    });
  });

  password.addEventListener('focus', () => {
    const placeholder = password.placeholder;

    password.placeholder = '';
    passwordErr.innerText = '';
    password.addEventListener('blur', () => {
      password.placeholder = placeholder;
    });
  });
}
