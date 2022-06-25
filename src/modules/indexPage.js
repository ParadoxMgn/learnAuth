import reg from './reg';
import auth from './auth';
import users from './users';

const indexPage = () => {
  const containerIndex = document.querySelector('.container-index');

  if (containerIndex) {
    reg(users());
    auth();
  }
};

export default indexPage;