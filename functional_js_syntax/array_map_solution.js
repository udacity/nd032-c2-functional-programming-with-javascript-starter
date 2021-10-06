// 1. Write a map function to reverse this array:
const start = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const end = start.map(x => abs(x - 11))
console.log(end)
// expected output: Array [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

// ----------------------------------------------------------
// 2. Write a map function to print the Job: Name:
const shipMates = [["Mal", "Captain"], ["Wash", "Pilot"], ["Zoey", "1st Mate"], ["Jayne", "Public Relations"]]

const result = shipMates.map(arr => arr.reverse().join(': '))
console.log(result)
// The join() method joins all elements of an array into a string.

// expected output: Array ["Captain: Mal", etc...]

// ----------------------------------------------------------
// 3. Write a map function that prints the name: even|odd
const awayTeam = ["Picard", "Riker", "Troy", "Data"]

const result = awayTeam.map((name, i) => `${name}: ${i % 2 === 0 ? 'even' : 'odd'}`)
console.log(result)

// The "i" represents the index of the element in the array. In order to get the length of the name, the code should look like

awayTeam.map((name, _) => `${name}: ${name.length % 2 === 0 ? 'even' : 'odd'}`)

// expected output: Array: ["Picard: even", "Riker: odd", etc...]


// ----------------------------------------------------------
// 3. Create a multidimensional array of each item and its index in the original Array

const sciFiShows = ['Manedlorian', 'Enterprise', 'Firefly', 'Battlestar Galactica']

const result = sciFiShows.map((show, index) => [show, index])
console.log(result)
// expected output: Array [['Manedlorian', 0], ['Enterprise', 1], ['Firefly', 2], ['Battlestar Galactica', 3]]

// ----------------------------------------------------------
// 4. For each item in this array, create a multidimensional array containing the entire original array

const numbers = [1, 2, 3, 4]

const result = numbers.map((num, index, wholeArray) => wholeArray)
console.log(result)
// expected output: Array [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]]
