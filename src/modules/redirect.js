const redirect = () => {
  const indexPath = window.location.href.slice(0, window.location.href.lastIndexOf('/'));
  const index = indexPath + '/index.html';
  const home = indexPath + '/home.html';

  let authEMail = JSON.parse(localStorage.getItem('auth')) || '';

  const containerIndex = document.querySelector('.container-index');
  const containerHome = document.querySelector('.container-home');

  if (containerIndex) {
    if (authEMail !== '') {
      window.location.replace(home);
    }
  }

  if (containerHome) {
    if (authEMail === '') {
      window.location.replace(index);
    }
  }
};

export default redirect;