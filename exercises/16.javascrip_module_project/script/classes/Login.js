import HandleLocalStorage from './HandleLocalStorage.js';
import Utils from './Utils.js';
import routes from '../dataBase/routes.js';

const handleStorage = new HandleLocalStorage();
const utils = new Utils();

class LogIn {
  constructor(userName, password) {
    this.userName = userName;
    this.password = password;
  }

  verifyUser() {
    const userExists = handleStorage.retriveUsers()?.users.find((user) => {
      if (
        user.userName === this.userName &&
        utils.decryptPassword(user.password) === this.password
      )
        return user;
    });

    if (userExists) {
      handleStorage.updateLoggedUser(userExists.id);
      handleStorage.updateUsers();

      utils.redirectToNewPage(routes.homePage[0], routes.homePage[1]);
    } else {
      throw new Error('userNotFound');
    }
  }
}

export default LogIn;
