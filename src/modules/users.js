const users = () => {
  const localUserList = JSON.parse(localStorage.getItem('users')) || [];
  let authEMail = JSON.parse(localStorage.getItem('auth')) || [];

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
  const perm = document.querySelector('.perm');
  let indexChange;
  let checkPerm;

  class User {
    constructor(index, email, password, dateReg, permissions = 'user', auth = '') {
      this.index = index;
      this.email = email;
      this.password = password;
      this.dateReg = dateReg;
      this.permissions = permissions;
      this.auth = auth;
    }
    start() {
      this.show();

      if (this.auth) {
        tBody.addEventListener('click', e => {
          if (e.target.matches('.btn')) {
            indexChange = +e.target.id;

            this.openChange(e);
          }
        });

        popupBtnSave.addEventListener('click', this.change.bind(this));
        popupClose.addEventListener('click', this.closeChange.bind(this));
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
        <td class="e${this.index}">${this.email}</td>
        <td>${authEMail[1] === 'admin' ? `<button class="btn" id="${this.index}">Редактировать данные</button>` :
          this.auth ? `<button class="btn" id="${this.index}">Редактировать данные</button>` : ''}</td>
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
      perm.value = localUserList[`${e.target.id}`].permissions;
      perm.style.display = 'none';
      if (authEMail[1] === 'admin') {
        if (localUserList[`${e.target.id}`].email !== authEMail[0]) {
          perm.style.display = 'inline-block';
        }
      }
      popup.style.zIndex = '3';
      popup.style.visibility = 'visible';

      this.animPopup();
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
          if (item.index !== indexChange) {
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
              if (item.index === indexChange) {
                item.email = popupEmail.value;

                if (item.auth) {
                  authEMail[0] = popupEmail.value;
                }
              }
            });
            checkMail = false;
          }
        }
        if (checkPass) {
          if (popupPassword.value !== '') {
            if (popupPassword.value === popupPasswordCheck.value) {
              localUserList.forEach(item => {
                if (item.index === indexChange) {
                  item.password = popupPassword.value;
                }
              });
              checkPass = false;
            } else {
              textErr.innerText = 'Пароли не совпадают';
            }
          }
        }

        localUserList.forEach(item => {
          if (item.index === indexChange) {
            checkPerm = item.permissions;
            if (perm.value !== item.permissions) {

              item.permissions = perm.value;
              alert('Права успешно изменены!');
            }
          }
        });


        if (popupEmail.value.trim() !== '' || popupPassword.value !== '' || perm.value !== checkPerm) {
          popup.style.zIndex = '1';
          popup.style.visibility = 'hidden';
          localStorage.setItem('users', JSON.stringify(localUserList));
          localStorage.setItem('auth', JSON.stringify(authEMail));
        }
        if (!checkMail) {
          alert('EMail успешно изменен!');
          textEmail.innerText = authEMail[0];
          document.querySelector(`.e${indexChange}`).innerText = localUserList[indexChange].email;
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