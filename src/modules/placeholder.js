const placeholder = () => {
  const containerHome = document.querySelector('.container-home');
  const containerIndex = document.querySelector('.container-index');

  const rePlaceHolder = (elem, elemErr) => {
    elem.addEventListener('focus', () => {
      const placeholder = elem.placeholder;
      elem.placeholder = '';
      elemErr.innerText = '';
      elem.addEventListener('blur', () => {
        elem.placeholder = placeholder;
      });
    });
  };

  if (containerIndex) {
    const email = document.getElementById('email');
    const emailErr = document.getElementById('email-err');
    const password = document.getElementById('password');
    const passwordErr = document.getElementById('password-err');

    rePlaceHolder(email, emailErr);
    rePlaceHolder(password, passwordErr);
  }

  if (containerHome) {
    const popupEmail = document.getElementById('popup__email');
    const popupPassword = document.getElementById('popup__password');
    const popupPasswordCheck = document.getElementById('popup__password-check');
    const popupEmailErr = document.getElementById('popup__email-err');
    const popupPasswordErr = document.getElementById('popup__password-err');
    const textErr = document.getElementById('text-err');

    rePlaceHolder(popupEmail, popupEmailErr);
    rePlaceHolder(popupPassword, popupPasswordErr);
    rePlaceHolder(popupPasswordCheck, textErr);
  }
};

export default placeholder;