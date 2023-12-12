import HandleLocalStorage from './classes/HandleLocalStorage.js';
import Utils from './classes/Utils.js';
import Register from './classes/Register.js';
import LogIn from './classes/Login.js';
import routes from './dataBase/routes.js';

const handleStorage = new HandleLocalStorage();
const utils = new Utils();

// LOG IN inputs
const logInForm = document.getElementById('login__form');
const logInUserName = document.getElementById('login__form__username__input');
const logInPassword = document.getElementById('login__form__password__input');
const logInButton = document.getElementById('login__form__button');
const logInInputsArray = document.querySelectorAll('#login__form input');

// SIGN UP inputs
const signUpForm = document.getElementById('signup__form');
const signUpEmail = document.getElementById('signup__form__email__input');
const signUpFirstName = document.getElementById(
  'signup__form__firstname__input'
);
const signUpLastName = document.getElementById('signup__form__lastname__input');
const signUpUserName = document.getElementById('signup__form__username__input');
const signUpAge = document.getElementById('signup__form__age__input');
const signUpPassword = document.getElementById('signup__form__password__input');
const signUpButton = document.getElementById('signup__form__button');
const sigInInputsArray = document.querySelectorAll('#signup__form input');

// LOGIN / SIGNUP toggle
const handleLoginToggle = document.getElementById(
  'login__form__signup__button'
);
const handleSignupToggle = document.getElementById(
  'signup__form__login__button'
);
const loginElement = document.getElementById('login');
const signupElement = document.getElementById('signup');

window.addEventListener('load', () => {
  const getLoggedUser = handleStorage.retriveUsers()?.loggedUser;

  if (getLoggedUser) {
    utils.redirectToNewPage(routes.homePage[0], routes.homePage[1]);
  }
});

const toastsContainer = document.querySelector('.toasts__container');

// live input validation
let response = false;
function handleLiveInputValidation(formInput, button) {
  formInput.addEventListener('input', () => {
    if (formInput.id != 'signup__form__username__input') {
      response = utils.validateUserInput(
        formInput.type,
        formInput.value,
        formInput.parentElement,
        formInput
      );
    }

    if (signUpFirstName && signUpLastName) {
      signUpUserName.value = signUpFirstName.value + '.' + signUpLastName.value;
    }

    if (!response) {
      button.setAttribute('disabled', '');
      return;
    } else {
      button.removeAttribute('disabled');
    }
  });
}

// validation on submit
function handleSubmitInputValidation(formInput) {
  if (formInput.id != 'signup__form__username__input') {
    response = utils.validateUserInput(
      formInput.type,
      formInput.value,
      formInput.parentElement,
      formInput
    );
  }
}

// Sign up validation
sigInInputsArray.forEach((formInput) => {
  handleLiveInputValidation(formInput, signUpButton);
});

// Log in validation
logInInputsArray.forEach((formInput) => {
  handleLiveInputValidation(formInput, logInButton);
});

/* The code snippet is adding an event listener to the signUpForm element for the 'submit' event. When the form is submitted, the event listener callback function is executed and
a new user is added to the database. */

signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();

  sigInInputsArray.forEach((formInput) => {
    handleSubmitInputValidation(formInput);
  });

  if (!response) {
    utils.toastNotification(
      utils.handleErrorMessages('emptyInputs'),
      4000,
      toastsContainer
    );
    signUpButton.setAttribute('disabled', '');
    return;
  }

  const userName =
    signUpFirstName.value.toLowerCase() +
    '.' +
    signUpLastName.value.toLowerCase();

  const register = new Register(
    signUpEmail.value,
    signUpFirstName.value,
    signUpLastName.value,
    userName,
    signUpAge.value,
    signUpPassword.value
  );

  try {
    register.addNewUser();
  } catch (error) {
    signUpButton.setAttribute('disabled', '');
    utils.toastNotification(
      utils.handleErrorMessages(error.message),
      4000,
      toastsContainer
    );
  }
});

/* The code snippet is adding an event listener to the `logInForm` element for the 'submit' event. When the form is submitted, the event listener callback function is executed and the user is logged in his account. */
logInForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const login = new LogIn(logInUserName.value, logInPassword.value);

  logInInputsArray.forEach((formInput) => {
    handleSubmitInputValidation(formInput);
  });

  if (!response) {
    utils.toastNotification(
      utils.handleErrorMessages('emptyInputs'),
      4000,
      toastsContainer
    );
    logInButton.setAttribute('disabled', '');
    return;
  }

  try {
    login.verifyUser();
  } catch (error) {
    logInButton.setAttribute('disabled', '');
    utils.toastNotification(
      utils.handleErrorMessages(error.message),
      4000,
      toastsContainer
    );
  }
});

// toggle login / singup form

handleLoginToggle.addEventListener('click', (e) => {
  e.preventDefault();
  loginElement.style.transform = 'translate(-110%)';
  signupElement.style.transform = 'translate(0%)';
});
handleSignupToggle.addEventListener('click', (e) => {
  e.preventDefault();
  signupElement.style.transform = 'translate(100%)';
  loginElement.style.transform = 'translate(0%)';
});

// toggle password visibility
const showPassword = document.querySelectorAll('.show__password');
showPassword.forEach((element) => {
  element.addEventListener('click', () => {
    // console.log(showPassword.firstElementChild);
    utils.togglePassword(
      element.previousElementSibling,
      element.firstElementChild
    );
  });
});
