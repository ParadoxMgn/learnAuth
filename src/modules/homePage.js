import exit from './exit';
import showHome from './showHome';

const homePage = () => {
  const containerHome = document.querySelector('.container-home');

  if (containerHome) {
    showHome();
    exit();
  }
};

export default homePage;