import HandleLocalStorage from './classes/HandleLocalStorage.js';
import Utils from './classes/Utils.js';
import routes from './dataBase/routes.js';

const handleStorage = new HandleLocalStorage();
const utils = new Utils();
const loggedUserId = handleStorage.retriveUsers()?.loggedUser;
const loggedUserData = handleStorage
  .retriveUsers()
  .users.find((user) => user.id === loggedUserId);

// DOM elements
const saveNewUserInfoButton = document.getElementById('edit__profile__button');

const editProfileEmailInput = document.getElementById(
  'edit__profile__email__input'
);
const editProfileFirstNameInput = document.getElementById(
  'edit__profile__firstname__input'
);
const editProfileLastNameInput = document.getElementById(
  'edit__profile__lastname__input'
);
const editProfileUsernameInput = document.getElementById(
  'edit__profile__username__input'
);
const editProfileAgeInput = document.getElementById(
  'edit__profile__age__input'
);
const editProfilePasswordInput = document.getElementById(
  'edit__profile__password__input'
);
const showPassword = document.getElementById('showPassword');

// toast container
const toastsContainer = document.querySelector('.toasts__container');

// delete account
const deleteAccountInput = document.getElementById(
  'delete__account__email__validation'
);
const deleteAccountButton = document.getElementById('delete__account__button');

/* The `window.addEventListener('load', () => { ... })` code block is adding an event listener to the
`window` object for the 'load' event. This event is fired when the entire page and its resources
(such as images and scripts) have finished loading. It checks if it a user was logged in, if it was not, it call redirectToNewPage() function and redirects the user to log in page */
window.addEventListener('load', () => {
  !loggedUserId
    ? utils.redirectToNewPage(routes.logInPage[0], routes.logInPage[1])
    : null;

  if (loggedUserData) {
    editProfileEmailInput.value = loggedUserData.email;
    editProfileFirstNameInput.value = loggedUserData.firstName;
    editProfileLastNameInput.value = loggedUserData.lastName;
    editProfileUsernameInput.value = loggedUserData.userName;
    editProfileAgeInput.value = loggedUserData.age;
    editProfilePasswordInput.value = loggedUserData.password;
  }
});

// add event to display username in UI

[editProfileFirstNameInput, editProfileLastNameInput].forEach((input) =>
  input.addEventListener('input', () => {
    editProfileUsernameInput.value =
      editProfileFirstNameInput.value + '.' + editProfileLastNameInput.value;
  })
);

// save new user information in localStorage and redirect to homepage
saveNewUserInfoButton.addEventListener('click', (e) => {
  e.preventDefault();

  const userDbClone = JSON.parse(JSON.stringify(handleStorage.usersDataBase));

  const newUserdata = {
    id: loggedUserId,
    email: editProfileEmailInput.value,
    firstName: editProfileFirstNameInput.value,
    lastName: editProfileLastNameInput.value,
    userName: editProfileUsernameInput.value,
    age: editProfileAgeInput.value,
    password: utils.encryptPassword(editProfilePasswordInput.value),
  };

  const indexOfLoggedUser = userDbClone.users.findIndex(
    (user) => user.id === loggedUserId
  );

  try {
    userDbClone.users.splice(indexOfLoggedUser, 1, newUserdata);

    handleStorage.usersDataBase.users.length = 0;
    handleStorage.usersDataBase.users.push(...userDbClone.users);
    handleStorage.updateUsers();
    utils.toastNotification(
      'The data has been successfully saved.',
      2500,
      toastsContainer
    );
    setTimeout(() => {
      utils.redirectToNewPage(routes.homePage[0], routes.homePage[1]);
    }, 2500);
  } catch (error) {
    utils.toastNotification(
      (error = 'Something went wrong...'),
      2500,
      toastsContainer
    );
  }
});

// toggle password visibility
showPassword.addEventListener('click', () => {
  // console.log(showPassword.firstElementChild);
  utils.togglePassword(
    showPassword.previousElementSibling,
    showPassword.firstElementChild
  );
});

// live input validation
const editUserInfoInputs = document.querySelectorAll(
  '#edit__profile__form input'
);

let response = false;
function handleLiveInputValidation(formInput, button) {
  if (formInput.id === 'delete__account__email__validation') return;
  formInput.addEventListener('input', () => {
    response = utils.validateUserInput(
      formInput.type,
      formInput.value,
      formInput.parentElement,
      formInput
    );

    if (!response) {
      button.setAttribute('disabled', '');
      return;
    } else {
      button.removeAttribute('disabled');
    }
  });
}

// edit user informations live validation
editUserInfoInputs.forEach((formInput) => {
  handleLiveInputValidation(formInput, saveNewUserInfoButton);
});

// delete account events
deleteAccountInput.addEventListener('input', (e) => {
  e.preventDefault();

  const userDbClone = JSON.parse(JSON.stringify(handleStorage.usersDataBase));
  const isEmailValid = userDbClone.users.find(
    (user) =>
      user.email === deleteAccountInput.value && user.id === loggedUserId
  );

  if (!isEmailValid) {
    if (
      deleteAccountInput.parentElement.lastChild.className != 'error__container'
    ) {
      deleteAccountButton.setAttribute('disabled', '');
      const errorContainer = document.createElement('div');
      errorContainer.classList.add('error__container');
      errorContainer.textContent = utils.handleErrorMessages(
        deleteAccountInput.dataset.error
      );
      deleteAccountInput.parentElement.append(errorContainer);
      deleteAccountInput.parentElement.style.border = '2px solid red';
    }
  } else {
    deleteAccountButton.removeAttribute('disabled');
    if (
      deleteAccountInput.parentElement.lastChild.className ===
      'error__container'
    ) {
      deleteAccountInput.parentElement.lastChild.remove();
      deleteAccountInput.parentElement.style.border = '2px solid green';
    }

    deleteAccountButton.addEventListener('click', () => {
      try {
        const newUsers = userDbClone.users.filter(
          (user) => user.email != deleteAccountInput.value
        );

        handleStorage.usersDataBase.users.length = 0;
        handleStorage.usersDataBase.loggedUser = '';
        handleStorage.usersDataBase.users.push(...newUsers);
        handleStorage.updateUsers();
        utils.toastNotification(
          'Your account has been successfully deleted.',
          2500,
          toastsContainer
        );
        setTimeout(() => {
          utils.redirectToNewPage(routes.logInPage[0], routes.logInPage[1]);
        }, 2500);
      } catch (error) {
        utils.toastNotification(
          (error = 'Something went wrong...'),
          2500,
          toastsContainer
        );
      }
    });
  }
});
