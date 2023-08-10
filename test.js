store = [
  {
    "name": "lennyaiko",
    "day": 1,
    "month": 8
  },
    {
        "name": "lennyaiko",
        "day": 10,
        "month": 8
    },
    {
        "name": "lennyaiko",
        "day": 10,
        "month": 8
    },
    {
        "name": "lennyaiko",
        "day": 1,
        "month": 8
    },
    {
        "name": "lennyaiko",
        "day": 1,
        "month": 8
    }
]

const date = new Date()

// store.forEach(element => {
//     if (element.day === date.getDate())
//         console.log(element)
// });

const { celebrants } = require('./data')

console.log(celebrants(store))
