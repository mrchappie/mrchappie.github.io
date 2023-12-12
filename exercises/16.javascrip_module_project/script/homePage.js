import HandleLocalStorage from './classes/HandleLocalStorage.js';
import Utils from './classes/Utils.js';
import routes from './dataBase/routes.js';

const handleStorage = new HandleLocalStorage();
const utils = new Utils();
const loggedUserId = handleStorage.retriveUsers()?.loggedUser;

const shiftsContainerEl = document.getElementById('shifts__table__list');
const bestMonthContainer = document.getElementById('bestMonth');

/* The `window.addEventListener('load', () => { ... })` code block is adding an event listener to the
`window` object for the 'load' event. This event is fired when the entire page and its resources
(such as images and scripts) have finished loading. It checks if it a user was logged in, if it was not, it call redirectToNewPage() function and redirects the user to log in page */
window.addEventListener('load', () => {
  !loggedUserId
    ? utils.redirectToNewPage(routes.logInPage[0], routes.logInPage[1])
    : null;

  displayLoggedUserData();
});

function displayBestMonth(bestMonth) {
  bestMonthContainer.innerHTML = '';

  // create best month heading
  const listElHeading = document.createElement('li');
  listElHeading.textContent = 'Best month:';
  bestMonthContainer.append(listElHeading);

  // create best month element
  const listElMonth = document.createElement('li');
  listElMonth.textContent = `${bestMonth.month}, ${bestMonth.year}`;
  bestMonthContainer.append(listElMonth);

  // create best month profit element
  const listElProfit = document.createElement('li');
  listElProfit.textContent = `${bestMonth.profit} RON`;
  bestMonthContainer.append(listElProfit);
}

// calculate best month by profit
function calculateBestMonth(shiftDbClone) {
  if (shiftDbClone.length === 0) {
    bestMonthContainer.innerHTML = '';
    bestMonthContainer.textContent = 'No shifts to calculate best month';
    return;
  }
  // prettier-ignore
  const monthsList = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const months = shiftDbClone.map((shift) => {
    return {
      month: new Date(shift.date).getMonth(),
      year: new Date(shift.date).getFullYear(),
      profit: shift.totalProfitPerShift,
    };
  });

  const profitByMonth = {};

  for (let i = 0; i < months.length; i++) {
    const key = months[i].month + '-' + months[i].year;
    if (!profitByMonth[key]) {
      profitByMonth[key] = months[i].profit;
    } else {
      profitByMonth[key] += months[i].profit;
    }
  }

  const profitEntries = Object.entries(profitByMonth);
  profitEntries.sort((a, b) => b[1] - a[1]);

  const bestMonthAndYear = profitEntries[0][0];

  displayBestMonth({
    month: monthsList[bestMonthAndYear.charAt(0)],
    year: bestMonthAndYear.slice(2),
    profit: profitEntries[0][1],
  });
}

/**
 * The function displays the first name of the logged-in user and inserts
 *  shifts for that user into DOM.
 */
function displayLoggedUserData() {
  const shifts = handleStorage.retrieveShifts()[loggedUserId] || [];
  shifts?.forEach((shift) => utils.createShift(shift, shiftsContainerEl));

  if (shifts.length != 0) {
    const shiftsTableListHeading = document.getElementById(
      'shifts__table__list__heading'
    );
    shiftsTableListHeading.style.display = 'none';
  }

  const shiftDbClone = JSON.parse(
    JSON.stringify(handleStorage.shiftsDataBase[loggedUserId])
  );

  calculateBestMonth(shiftDbClone);
}

// filter shifts
const filterNameInput = document.getElementById('search__shift__name');
const filterStartDateInput = document.getElementById(
  'search__shift__startDate'
);
const filterEndDateInput = document.getElementById('search__shift__endDate');
const filterSearchButton = document.getElementById('search__shift__button');
const clearFiltersButton = document.getElementById('clearFiltersButton');

function filterShiftsList(shiftName, shiftStartDate, shiftEndDate) {
  if (!shiftName && !shiftStartDate && !shiftEndDate) return;

  const shiftDbClone = JSON.parse(
    JSON.stringify(handleStorage.shiftsDataBase[loggedUserId])
  );

  function convert(date) {
    return new Date(date);
  }

  const filteredShifts = shiftDbClone.filter((shift) => {
    const shiftNameCondition =
      !shiftName ||
      shift.shiftName.toLowerCase().includes(shiftName.toLowerCase());
    const startDateCondition =
      !shiftStartDate || convert(shift.date) >= convert(shiftStartDate);
    const endDateCondition =
      !shiftEndDate || convert(shift.date) <= convert(shiftEndDate);

    return shiftNameCondition && startDateCondition && endDateCondition;
  });

  shiftsContainerEl.innerHTML = '';

  filteredShifts.forEach((shift) => {
    utils.createShift(shift, shiftsContainerEl);
  });

  calculateBestMonth(filteredShifts);
}

filterSearchButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (
    filterNameInput.value ||
    filterStartDateInput.value ||
    filterEndDateInput.value
  ) {
    filterShiftsList(
      filterNameInput.value,
      filterStartDateInput.value,
      filterEndDateInput.value
    );
    clearFiltersButton.removeAttribute('disabled');
  }
});

clearFiltersButton.addEventListener('click', (e) => {
  e.preventDefault();
  shiftsContainerEl.innerHTML = '';
  handleStorage.shiftsDataBase[loggedUserId].forEach((shift) => {
    utils.createShift(shift, shiftsContainerEl);
  });
  calculateBestMonth(handleStorage.shiftsDataBase[loggedUserId]);

  filterNameInput.value = '';
  filterStartDateInput.value = '';
  filterEndDateInput.value = '';

  clearFiltersButton.setAttribute('disabled', '');
});

// change borders of all children
// set timeout to wait for shifts to load into DOMt
// setTimeout(() => {
//   const shiftsContainer = document.querySelectorAll(
//     '#shifts__table__list  .shifts__table__shift'
//   );
//   console.log(shiftsContainer);

//   shiftsContainer.forEach((list) =>
//     list.addEventListener('mouseover', (e) => {
//       if (e.target.tagName.toLowerCase() === 'li') {
//         console.log(e.target.className);
//         const listClass = e.target.className;
//         shiftsContainer.forEach((shift) => {
//           Array.from(shift.children).forEach((list) => {
//             if (listClass === list.classList[0]) {
//               list.style.borderColor = '#9400ff';
//             }
//           });
//         });
//       }
//     })
//   );

//   shiftsContainer.forEach((list) =>
//     list.addEventListener('mouseout', (e) => {
//       if (e.target.tagName.toLowerCase() === 'li') {
//         console.log(e.target.className);
//         const listClass = e.target.className;
//         shiftsContainer.forEach((shift) => {
//           Array.from(shift.children).forEach((list) => {
//             if (listClass === list.classList[0]) {
//               list.style.borderColor = 'transparent';
//             }
//           });
//         });
//       }
//     })
//   );
// }, 500);
