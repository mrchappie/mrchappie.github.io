import routes from '../dataBase/routes.js';

class Utils {
  generateId() {
    const { v4: uuidv4 } = window.uuid;
    return uuidv4();
  }

  encryptPassword(password) {
    return password;
  }

  decryptPassword(password) {
    return password;
  }

  validateUserInput(inputType, inputValue, inputParentElement, inputElemnt) {
    const regexValidation = {
      /** This regex pattern checks for a basic email format. It allows for letters, digits, dots,
       * and hyphens in the local part, followed by an "@" symbol, followed by the domain
       * name (letters, digits, dots, and hyphens), and a top-level domain (e.g., com, org, net)
       * with at least two characters. */
      email: /^[\w\.-]+@[a-z\d\.-]+\.[a-z]{2,}$/i,

      /**
       * This pattern enforces a minimum length of 2 characters and allows both letters and digits.
       * It matches a single word (the first name) or two words separated by
       * a space (the first and last names).
       */
      text: /^(?:[A-Za-z\d]{2,}(?:\s[A-Za-z\d]+)?)$/,

      /**
       * This regular expression pattern ensures that the username consists
       * of two parts separated by a dot, with each part containing one or
       * more alphabetic characters.
       */
      username: /^[a-zA-Z]+\.[a-zA-Z]+$/,

      /** This regex pattern matches positive integers greater than 17,
       * which could be used for validating age. */
      number: /^(1[89]|[2-9]\d|\d{3,})$/,

      /** This regex ensures a strong password: 8+ characters,
       * at least one uppercase letter, at least one lowercase letter,
       * at least one digit, and at least one special character from [@ $ ! % * ? &] */
      password:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    };

    // validation for username input from login form
    if (
      regexValidation['username'].test(inputValue) &&
      inputElemnt.id === 'login__form__username__input'
    ) {
      inputParentElement.style.border = '2px solid green';
      if (inputParentElement.lastChild.className === 'error__container') {
        inputParentElement.lastChild.remove();
      }
      return true;
    }

    // validation for the other inputs
    else if (
      regexValidation[inputType].test(inputValue) &&
      inputElemnt.id != 'login__form__username__input'
    ) {
      inputParentElement.style.border = '2px solid green';

      if (inputParentElement.lastChild.className === 'error__container') {
        inputParentElement.lastChild.remove();
      }
      return true;
    } else {
      inputParentElement.style.border = '2px solid red';
      // create error html element and insert it under the input

      if (
        !document.querySelector(
          `.${inputParentElement.className} > .error__container`
        )
      ) {
        const errorContainer = document.createElement('div');
        errorContainer.classList.add('error__container');
        errorContainer.textContent = this.handleErrorMessages(
          inputElemnt.dataset.error
        );
        inputParentElement.append(errorContainer);
      }
      return false;
    }
  }

  handleErrorMessages(typeOfError) {
    const errorMessages = {
      usernameLogin: 'Please provide valid credentials',
      passwordLogin: 'Please provide valid credentials',
      username: 'Please use a username in the format "john.doe".',
      password: '8+ chars, uppercase, lowercase, digit, special char',
      email: 'Please enter a valid email address.',
      firstName: 'Use 2+ characters (letters/digits) for the first name.',
      lastName: 'Use 2+ characters (letters/digits) for the last name.',
      age: 'Age must be between 18 and 65 years.',
      userNotFound:
        'User not found. Please check your credentials and try again.',
      userExists:
        'This user already exists. Please choose a different username or email.',
      emptyInputs: 'Please fill in all the required fields.',
      deleteAccount: 'Please ensure both email addresses match.',
    };

    return errorMessages[typeOfError];
  }

  toastNotification(errorMessage, time = 4000, toastsContainer) {
    const toastElement = document.createElement('div');
    toastElement.classList.add('toast__notification');
    toastElement.textContent = errorMessage || 'Something went wrong..';

    toastsContainer.prepend(toastElement);

    setTimeout(() => {
      toastElement.remove();
    }, time);
  }

  redirectToNewPage(path, pageRef, shiftId) {
    location.href =
      location.origin +
      `${path}/${pageRef}.html${shiftId ? '?shiftId=' + shiftId : ''}`;
  }

  createShift(shift, parentEl) {
    const ulEl = document.createElement('ul');
    ulEl.classList.add('shifts__table__shift');
    ulEl.id = shift.shiftId;

    for (const key in shift) {
      if (key != 'shiftId') {
        const liEl = document.createElement('li');
        liEl.textContent =
          key === 'totalProfitPerShift'
            ? `${shift[key]} RON`
            : key === 'shiftName'
            ? shift[key].slice(0, 1).toUpperCase() + shift[key].slice(1)
            : key === 'shiftPlace'
            ? shift[key].slice(0, 1).toUpperCase() + shift[key].slice(1)
            : shift[key];

        liEl.classList.add(key);
        ulEl.append(liEl);
      }
    }

    ulEl.addEventListener('click', () => {
      this.editShift(ulEl.id);
    });

    parentEl.append(ulEl);
  }

  editShift(shiftId) {
    this.redirectToNewPage(
      routes.addNewShift[0],
      routes.addNewShift[1],
      shiftId
    );
  }

  togglePassword(parentElement, childElement) {
    //toggle password
    parentElement.type === 'text'
      ? (parentElement.type = 'password')
      : (parentElement.type = 'text');

    // toggle icon
    const imgPath = childElement.getAttribute('src').split('_');

    (imgPath[1] === 'on.svg'
      ? () => {
          imgPath[1] = 'off.svg';
          childElement.setAttribute('src', imgPath.join('_'));
        }
      : () => {
          imgPath[1] = 'on.svg';
          childElement.setAttribute('src', imgPath.join('_'));
        })();
  }
}

export default Utils;
