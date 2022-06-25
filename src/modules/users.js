const users = () => {
  const localUserList = JSON.parse(localStorage.getItem('users')) || [];
  let authEMail = JSON.parse(localStorage.getItem('auth')) || '';

  const textEmail = document.getElementById('text-email');
  const textDate = document.getElementById('text-date');
  const tBody = document.querySelector('tbody');
  const popup = document.getElementById('popup');
  const popupContent = document.querySelector('.popup__content');
  const popupClose = document.getElementById('popup_close');
  const popupEmail = document.getElementById('popup__email');
  const popupPassword = document.getElementById('popup__password');
  const popupPasswordCheck = document.getElementById('popup__password-check');
  let popupBtnSave = document.getElementById('popup__btn-save');
  const popupEmailErr = document.getElementById('popup__email-err');
  const popupPasswordErr = document.getElementById('popup__password-err');
  const textErr = document.getElementById('text-err');

  class User {
    constructor(index, email, password, dateReg, auth = '') {
      this.index = index;
      this.email = email;
      this.password = password;
      this.dateReg = dateReg;
      this.auth = auth;
    }
    start() {
      this.show();

      if (this.auth) {
        tBody.querySelector('#btn-cahge').addEventListener('click', this.openChange.bind(this));
        popupClose.addEventListener('click', this.closeChange.bind(this));
        popupBtnSave.addEventListener('click', this.change.bind(this));
        popupPasswordCheck.addEventListener('input', this.checkPass.bind(this));
        popupPassword.addEventListener('input', this.checkPass.bind(this));
      }
    }
    show() {
      if (this.auth) {
        textEmail.innerText = this.email;
        textDate.innerText = this.dateReg;
      }
      tBody.insertAdjacentHTML('beforeend', `<tr>
      <td>${this.index + 1}</td>
      <td>${this.email}</td>
      <td>${this.auth ? `<button class="btn" id="btn-cahge">Редактировать данные</button>` : ''}</td>
      </tr>`);
    }
    openChange(e) {
      e.preventDefault();

      let opacity = 0;

      this.animPopup = () => {
        const id = requestAnimationFrame(this.animPopup);
        opacity += 0.03;

        popupContent.style.opacity = `${opacity}`;
        if (opacity >= 1) {
          cancelAnimationFrame(id);
        }
      };
      popupContent.style.opacity = '0';
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

      this.animPopup(0);
    }
    closeChange(e) {
      e.preventDefault();

      popup.style.zIndex = '1';
      popup.style.visibility = 'hidden';
    }
    checkPass(e) {
      this.check = (passOne, passTwo) => {
        if (e.target === passOne) {
          if ((passOne.value !== passTwo.value) && passTwo.value.length > 0) {
            textErr.innerText = 'Пароли не совпадают';
          } else {
            textErr.innerText = '';
          }
        }
      };
      this.check(popupPasswordCheck, popupPassword);
      this.check(popupPassword, popupPasswordCheck);
    }
    change(e) {
      e.preventDefault();
      let check = true;
      let checkMail = true;
      let checkPass = true;

      if (popupEmail.value.trim() !== '') {
        if ((!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(popupEmail.value.trim()))) {
          check = false;
          popupEmailErr.innerText = 'Введите корректный eMail';
        }

        localUserList.forEach(item => {
          if (item.email !== authEMail) {
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
            localUserList.forEach(item => {
              if (item.email === authEMail) {
                item.email = popupEmail.value;
              }
            });
            authEMail = popupEmail.value;
            checkMail = false;
          }
        }
        if (checkPass) {
          if (popupPassword.value !== '') {
            if (popupPassword.value === popupPasswordCheck.value) {
              localUserList.forEach(item => {
                if (item.email === authEMail) {
                  item.password = popupPassword.value;
                }
              });
              checkPass = false;
            } else {
              textErr.innerText = 'Пароли не совпадают';
            }
          }

        }

        if (popupEmail.value.trim() !== '' || popupPassword.value !== '') {
          popup.style.zIndex = '1';
          popup.style.visibility = 'hidden';
          localStorage.setItem('users', JSON.stringify(localUserList));
          localStorage.setItem('auth', JSON.stringify(authEMail));
        }
        if (!checkMail) {
          alert('EMail успешно изменен!');
          textEmail.innerText = authEMail;
          tBody.innerHTML = '<tr><th>№ п/п</th><th>E-Mail</th><th class="td-btn">Редактирование</th></tr>';
          localUserList.forEach(item => {
            tBody.insertAdjacentHTML('beforeend', `<tr>
            <td>${item.index + 1}</td>
            <td>${item.email}</td>
            <td>${item.auth ? `<button class="btn" id="btn-cahge">Редактировать данные</button>` : ''}</td>
            </tr>`);
          });
          tBody.querySelector('#btn-cahge').addEventListener('click', this.openChange.bind(this));
        }
        if (!checkPass) {
          alert('Пароль успешно изменен!');
        }
      }
    }
  }

  return User;
};

export default users;