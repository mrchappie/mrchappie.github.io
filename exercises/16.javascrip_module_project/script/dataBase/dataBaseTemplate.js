// const user = {
//   email: 'alex@mail.com',
//   username: 'alex2023',
//   password: '123456789',
//   lastName: 'Doe',
//   firstName: 'John',
//   id: '1edxw2r38dshbq98wia',
// };

// const shiftsDataBase = {
//   userId: [
//     {
//       date: 'some date',
//       startTime: '12:40',
//       endTime: '20:40',
//       wagePerHour: 100,
//       shiftPlace: 'Company Name',
//       totalProfitPerShift: 800,
//     },
//     {
//       date: 'some date',
//       startTime: '12:40',
//       endTime: '20:40',
//       wagePerHour: 100,
//       shiftPlace: 'Company Name',
//       totalProfitPerShift: 800,
//     },
//   ],
// };

const shiftsDataBase = {
  '85d25b8f-f775-4d96-b95c-ca71d911faba': [
    {
      shiftName: 'Morning Shift',
      date: '2023-08-30',
      startTime: '09:00 AM',
      endTime: '05:00 PM',
      hourlyWage: 15,
      shiftPlace: 'Coffee Shop A',
      totalProfitPerShift: 120,
    },
    {
      shiftName: 'Afternoon Shift',
      date: '2023-08-31',
      startTime: '01:00 PM',
      endTime: '09:00 PM',
      hourlyWage: 18,
      shiftPlace: 'Retail Store B',
      totalProfitPerShift: 144,
    },
    {
      shiftName: 'Day Shift',
      date: '2023-09-01',
      startTime: '10:00 AM',
      endTime: '06:00 PM',
      hourlyWage: 20,
      shiftPlace: 'Restaurant C',
      totalProfitPerShift: 160,
    },
    {
      shiftName: 'Evening Shift',
      date: '2023-09-02',
      startTime: '02:00 PM',
      endTime: '10:00 PM',
      hourlyWage: 16,
      shiftPlace: 'Bar D',
      totalProfitPerShift: 128,
    },
    {
      shiftName: 'Morning Shift',
      date: '2023-09-03',
      startTime: '08:00 AM',
      endTime: '04:00 PM',
      hourlyWage: 17,
      shiftPlace: 'Bookstore E',
      totalProfitPerShift: 136,
    },
    {
      shiftName: 'Afternoon Shift',
      date: '2023-09-04',
      startTime: '12:00 PM',
      endTime: '08:00 PM',
      hourlyWage: 19,
      shiftPlace: 'Grocery Store F',
      totalProfitPerShift: 152,
    },
    {
      shiftName: 'Evening Shift',
      date: '2023-09-05',
      startTime: '03:00 PM',
      endTime: '11:00 PM',
      hourlyWage: 21,
      shiftPlace: 'Cinema G',
      totalProfitPerShift: 168,
    },
    {
      shiftName: 'Day Shift',
      date: '2023-09-06',
      startTime: '11:00 AM',
      endTime: '07:00 PM',
      hourlyWage: 14,
      shiftPlace: 'Museum H',
      totalProfitPerShift: 112,
    },
    {
      shiftName: 'Morning Shift',
      date: '2023-09-07',
      startTime: '09:00 AM',
      endTime: '05:00 PM',
      hourlyWage: 16,
      shiftPlace: 'Gym I',
      totalProfitPerShift: 128,
    },
    {
      shiftName: 'Afternoon Shift',
      date: '2023-09-08',
      startTime: '02:00 PM',
      endTime: '10:00 PM',
      hourlyWage: 18,
      shiftPlace: 'Library J',
      totalProfitPerShift: 144,
    },
  ],
};

const usersDataBase = {
  loggedUser: '',
  users: [],
};

export default { usersDataBase, shiftsDataBase };
