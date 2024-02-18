// 1. Write a map function to reverse this array:
const start = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// your code

const end = start.map(x => -1 * (x - 11))

// expected output: Array [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
console.log(end)

// ----------------------------------------------------------
// 2. Write a map function to print the Job: Name:
const shipMates = [["Mal", "Captain"], ["Wash", "Pilot"], ["Zoey", "1st Mate"], ["Jayne", "Public Relations"]]

// your code
const jobNames = shipMates.map(x => `${x[1]}: ${x[0]}`)

// expected output: Array ["Captain: Mal", etc...]
console.log(jobNames);

// ----------------------------------------------------------
// 3. Write a map function that prints the name: even|odd
const awayTeam = ["Picard", "Riker", "Troy", "Data"]

// your code
const evenOdd = awayTeam.map((x, index) => {
    if (index % 2) {
        return `${x}: odd`
    }
    else {
        return `${x}: even`
    }
})
// expected output: Array: ["Picard: even", "Riker: odd", etc...]
console.log(evenOdd)

// ----------------------------------------------------------
// 4. Create a multidimensional array of each item and its index in the original Array.

const sci_fi_shows = ['Manedlorian', 'Enterprise', 'Firefly', 'Battlestar Galactica']

// your code
const newArray = sci_fi_shows.map( (x, index) => [x, index] )
// expected output: Array [['Manedlorian', 0], ['Enterprise', 1], ['Firefly', 2], ['Battlestar Galactica', 3]]
console.log(newArray)
// ----------------------------------------------------------
// 5. For each item in this array, create a multidimensional array containing the entire original array.

const numbers = [1, 2, 3, 4]

// your code
const newNumber = numbers.map((x, index, array) => [array])

// expected output: Array [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]
console.log(newNumber)

// Having trouble with creating a 2D array? 
// Take a closer look at the last two arguments of map, one of them might be able to help
