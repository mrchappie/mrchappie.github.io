class HandleLocalStorage {
  constructor() {
    this.usersDataBase = this.retriveUsers() || {
      loggedUser: '',
      users: [],
    };

    this.shiftsDataBase = this.retrieveShifts() || {};
  }

  updateLoggedUser(loggedUserId) {
    this.usersDataBase.loggedUser = loggedUserId;
  }

  retriveUsers() {
    return JSON.parse(localStorage.getItem('shiftAppUsers'));
  }

  updateUsers(user, data = this.usersDataBase) {
    if (user) this.usersDataBase.users.push(user);
    localStorage.setItem('shiftAppUsers', JSON.stringify(data));
  }

  retrieveShifts() {
    return JSON.parse(localStorage.getItem('shiftAppUsersShifts'));
  }

  updateShifts(data = this.shiftsDataBase) {
    localStorage.setItem('shiftAppUsersShifts', JSON.stringify(data));
  }
}

export default HandleLocalStorage;
