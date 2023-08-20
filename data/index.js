const _ = require('lodash')

module.exports = {
  dir: __dirname,
  fileName: 'birthdays.json',
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  date: (value) => {
    switch (value) {
      case 1:
        return `${value}st`
        break
      case 2:
        return `${value}nd`
        break
      case 3:
        return `${value}rd`
        break
      default:
        return `${value}th`
    }
  },
  celebrants: (arr) => {
    return new Promise((resolve, reject) => {
      let dob = []
      const date = new Date()
      arr.forEach((element) => {
        if (element.day === date.getDate()) {
          if (element.month === date.getMonth()) dob.push(element)
        }
      })
      resolve(dob)
    })
  },
  inputChecker: (day, month) => {
    let message = 'Thanks for the entry'

    if (!_.range(1, 32).includes(day)) {
      message = 'Please enter your DOB again'
    }
    if (!_.range(1, 13).includes(month)) {
      message = 'Please enter your DOB again'
    }

    return message
  },
}
