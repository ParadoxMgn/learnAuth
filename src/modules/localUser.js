const localUser = User => {
  const localUserList = JSON.parse(localStorage.getItem('users')) || [];
  const userList = [];

  if (localUserList.length > 0) {
    localUserList.forEach((item, index) => {
      userList.push(new User(index, item.email, item.password, item.dateReg, item.auth));
    });
    localStorage.setItem('users', JSON.stringify(userList));
  }

  return userList;
};

export default localUser;