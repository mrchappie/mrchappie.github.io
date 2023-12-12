import HandleLocalStorage from './classes/HandleLocalStorage.js';
import Utils from './classes/Utils.js';
import routes from './dataBase/routes.js';

const handleStorage = new HandleLocalStorage();
const utils = new Utils();

const greetingMessage = document.querySelector(
  '#navigation__account__greeting > span'
);
const logOutBtn = document.getElementById('logOut');

const registeredUsers = handleStorage.retriveUsers();
const loggedUserId = registeredUsers?.loggedUser;

/* The code is adding an event listener to the `window` object for the 'load' event. When the window
finishes loading, the logged user name is displayed on the rigth side of the header. */
window.addEventListener('load', () => {
  greetingMessage.textContent = registeredUsers?.users
    .find((user) => user.id === loggedUserId)
    .firstName.split('')
    .map((char, index) => {
      if (index === 0) {
        return char.charAt(0).toUpperCase();
      } else {
        return char;
      }
    })
    .join('');
});

/* The code is adding an event listener to the `logOutBtn` element. When the button is clicked, the user is logged out from the app and the active user ID is removed from database. */
logOutBtn.addEventListener('click', () => {
  handleStorage.updateLoggedUser('');
  handleStorage.updateUsers();
  utils.redirectToNewPage(routes.logInPage[0], routes.logInPage[1]);
});

// extracts shift Id from URL, if this exists
const params = new URL(document.location).searchParams;
const urlShiftId = params.get('shiftId');

if (urlShiftId) {
  document
    .querySelectorAll('.navigation__links__add__shift')
    .forEach((element) => {
      element.textContent = 'Edit shift';
    });
}

// Mobile navigation
const toggleNavigationButton = document.getElementById('mobile__menu');
const toggleNavigationContainer = document.getElementById('mobile__nav');

toggleNavigationButton.addEventListener('click', () => {
  toggleNavigationContainer.classList.toggle('hide');
});
