// 1. Find all the words with more than 7 characters
const words1 = ['tardis', 'grok', 'frak', 'blaster', 'klingon', 'shepherd']

// expected output: Array ['shepherd']

const shepherd = words1.filter(v => v == "shepherd")

console.log(shepherd)

// ----------------------------------------------------------
// 2. Find all even values
const words2 = [12, 13, 14, 15, 16, 17]

// expected output: Array [12, 14, 16]

const evenValues = words2.filter (v => {
    if (!(v % 2))
    {
        return v
    }
})

console.log(evenValues)

// ----------------------------------------------------------
// REAL LIFE EXAMPLES

// We often use filter to quickly pull all the items that share a status or other characteristic. For instance, create a list of all the active bounty hunters from the array below:

const hunters = [
    {
        name: 'Greedo',
        universe: 'Star Wars',
        status: 'active',
    },
    {
        name: 'Boba Fett',
        universe: 'Star Wars',
        status: 'inactive',
    },
    {
        name: 'Asajj Ventress',
        universe: 'Star Wars',
        status: 'unknown',
    },
    {
        name: 'Zam Wesell',
        universe: 'Star Wars',
        status: 'inactive',
    },
    {
        name: 'Jango Fett',
        universe: 'Star Wars',
        status: 'active',
    },
]

const activeHunters = hunters.filter (v => {
    if (v.status === "active")
    {
        return v;
    }
})

console.log(activeHunters)

// expected output: Array [
//     {
//         name: 'Greedo',
//         universe: 'Star Wars',
//         status: 'active',
//     },
//     {
//         name: 'Jango Fett',
//         universe: 'Star Wars',
//         status: 'active',
//     },
// ]