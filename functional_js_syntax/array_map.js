// 1. Write a map function to reverse this array:
const start = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// your code
const reverse = start.map(nums => nums).reverse();
console.log(reverse);
// expected output: Array [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

// ----------------------------------------------------------
// 2. Write a map function to print the Job: Name:
// your code
const shipMates = [["Mal", "Captain"], ["Wash", "Pilot"], ["Zoey", "1st Mate"], ["Jayne", "Public Relations"]]
const jobs = shipMates.map(job => job[1]);

console.log(jobs);
// expected output: Array ["Captain: Mal", etc...]

// ----------------------------------------------------------
// 3. Write a map function that prints the name: even|odd
// your code
const awayTeam = ["Picard", "Riker", "Troy", "Data"]
const evenOdd = awayTeam.map((team, index) => {
    if(index === 0 || index === 2) {
        return `${team}: even`;
    } else {
        return `${team}: odd`;
    }
});

console.log(evenOdd);
// expected output: Array: ["Picard: even", "Riker: odd", etc...]

// ----------------------------------------------------------
// 4. Create a multidimensional array of each item and its index in the original Array.
// your code
const sci_fi_shows = ['Manedlorian', 'Enterprise', 'Firefly', 'Battlestar Galactica']
const show = sci_fi_shows.map((show, index) => {
    return Array(show, index);
});
console.log(show);
// expected output: Array [['Manedlorian', 0], ['Enterprise', 1], ['Firefly', 2], ['Battlestar Galactica', 3]]

// ----------------------------------------------------------
// 5. For each item in this array, create a multidimensional array containing the entire original array.
// your code
const sci_fi_show = [1, 2, 3, 4]
const original = sci_fi_show.map((x, y, array) => {
    return array;
});
console.log(original);
// expected output: Array [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]
