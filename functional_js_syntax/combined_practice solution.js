const characters = [
    {
        name: "Marvin the Paranoid Android",
        role: "First Mate",
        universe: "Hitchhikers Guide to the Galaxy",
        weapon: "severe depression",
        power_level: 1000,
    },
    {
        name: "Jabba the Hut",
        role: "villain",
        universe: "Star Wars",
        weapon: "henchmen",
        power_level: 200,
    },
    {
        name: "Zoë Alleyne Washburne",
        role: "First Mate",
        universe: "Firefly",
        weapon: "Winchester Model 1892 rifle",
        power_level: 160,
    },
    {
        name: "Peter Venkman",
        role: "Ghostbuster",
        universe: "Ghostbusters",
        weapon: "proton pack",
        power_level: 120,
    },
    {
        name: "Kathryn Janeway",
        role: "Captain",
        universe: "Star Trek",
        weapon: "Wit",
        power_level: 140,
    },
    {
        name: "Dr. Daniel Jackson",
        role: "Archeologist",
        universe: "Stargate",
        weapon: "Zat gun",
        power_level: 120,
    },
    {
        name: "Q",
        role: "God/Eternal",
        universe: "Star Trek",
        weapon: "Whatever he wants",
        power_level: 1000,
    },
    {
        name: "Boba Fett",
        role: "Bounty Hunter",
        universe: "Star Wars",
        weapon: "EE-3 carbine rifle",
        power_level: 400,
    },
    {
        name: "Yoda",
        role: "Jedi Master",
        universe: "Star Wars",
        weapon: "The Force",
        power_level: 900,
    },
    {
        name: "Mal Reynolds",
        role: "Captain",
        universe: "Firefly",
        weapon: "pistol",
        power_level: 160,
    },
    {
        name: "Spock",
        role: "First Mate",
        universe: "Star Trek",
        weapon: "Logic",
        power_level: 170,
    },
    {
        name: "R2-D2",
        role: "Ship`s Robot",
        universe: "Star Wars",
        weapon: "Data Probe",
        power_level: 250,
    },
    {
        name: "Lore",
        role: "Villain",
        universe: "Star Trek",
        weapon: "Intellect",
        power_level: 800,
    },
];

// ----------------------------------------------------------
// COMBINED PRACTICE 1
// ----------------------------------------------------------

// Create an array containing only the names of Captains from all universes.

// expected output: ['Mal Reynolds', 'Kathryn Janeway']

// solution:
const captainNames = characters.filter((c) => c.role == "Captain").map((c) => c.name);

// ----------------------------------------------------------
// COMBINED PRACTICE 2
// ----------------------------------------------------------

// Group all characters by universe in a multidimensional array

// expected output:

// [ [ { name: 'Marvin the Paranoid Android',
//       role: 'First Mate',
//       universe: 'Hitchhikers Guide to the Galaxy',
//       weapon: 'severe depression',
//       power_level: 1000 } ],
//   [ { name: 'Jabba the Hut',
//       role: 'villain',
//       universe: 'Star Wars',
//       weapon: 'henchmen',
//       power_level: 200 },
//     { name: 'Boba Fett',
//       role: 'Bounty Hunter',
//       universe: 'Star Wars',
//       weapon: 'EE-3 carbine rifle',
//       power_level: 400 },
//     { name: 'Yoda',
//       role: 'Jedi Master',
//       universe: 'Star Wars',
//       weapon: 'The Force',
//       power_level: 900 },
//     { name: 'R2-D2',
//       role: 'Ship`s Robot',
//       universe: 'Star Wars',
//       weapon: 'Data Probe',
//       power_level: 250 } ],
//   [ { name: 'Zoë Alleyne Washburne',
//       role: 'First Mate',
//       universe: 'Firefly',
//       weapon: 'Winchester Model 1892 rifle',
//       power_level: 160 },
//     { name: 'Mal Reynolds',
//       role: 'Captain',
//       universe: 'Firefly',
//       weapon: 'pistol',
//       power_level: 160 } ],
//   [ { name: 'Peter Venkman',
//       role: 'Ghostbuster',
//       universe: 'Ghostbusters',
//       weapon: 'proton pack',
//       power_level: 120 } ],
//   [ { name: 'Kathryn Janeway',
//       role: 'Captain',
//       universe: 'Star Trek',
//       weapon: 'Wit',
//       power_level: 140 },
//     { name: 'Q',
//       role: 'God/Eternal',
//       universe: 'Star Trek',
//       weapon: 'Whatever he wants',
//       power_level: 1000 },
//     { name: 'Spock',
//       role: 'First Mate',
//       universe: 'Star Trek',
//       weapon: 'Logic',
//       power_level: 170 },
//     { name: 'Lore',
//       role: 'Villain',
//       universe: 'Star Trek',
//       weapon: 'Intellect',
//       power_level: 800 } ],
//   [ { name: 'Dr. Daniel Jackson',
//       role: 'Archeologist',
//       universe: 'Stargate',
//       weapon: 'Zat gun',
//       power_level: 120 } ] ]

// solution:

const groupedCharacters = characters.reduce((acc, curr, i, arr) => {
    // The 4 parameters represent
    // Accumulator (acc), The accumulator accumulates callback's return values. It is the accumulated value previously returned in the last invocation of the callback or initial values, if it was supplied.

    // curr: The current element being processed in the array.
    // i: The index of the current element being processed in the array.
    // arr: The source array reduce() was called upon.
    acc[curr.universe] = acc[curr.universe] === undefined ? [] : acc[curr.universe];
    // it's trying to check if the the current accumulator has the key of the current universe, and then it will set it to be empty array otherwise the current value
    //         We are here checking if in the acc has a universe value that similar to the one in the curr object or not.

    // if not and returned as undefined we then will have a new array [] if not it then will return the acc.

    // remember that we are grouping according to the universe (this is how we grouped them).
    acc[curr.universe].push(curr); //Here we will push the current object on the acc.

    if (i + 1 == arr.length) {
        return Object.values(acc);
    }
    //         Here we check if the reduce function finished looping on all of the Universe array by checking if i + 1 (index of the loop + 1 because as you know index starts from zero) equal to arr (the source Universe array) length.

    // If they are equal that means the reduce function finished working on all of the items and it is time to return the acc (accumulator).

    return acc;
}, {});

// ----------------------------------------------------------
// COMBINED PRACTICE 3
// ----------------------------------------------------------

// Create an array containing characters' names who are the only character listed in their universe.

// expected output: [ Marvin the Paranoid Android, Peter Venkman, Dr. Daniel Jackson ]

// solution:
const groupByUniverse = (acc, curr, i, arr) => {
    acc[curr.universe] = acc[curr.universe] === undefined ? [] : acc[curr.universe];

    // above line: Here you are making a property check, you check if the curr(currentValue).universe key, it can be something like 'Star Trek', exists on the acc object. If it is undefined, you set the key to an empty [] array, if it is defined, you assign it to the same value, which equals to doing nothing.

    acc[curr.universe].push(curr);

    if (i + 1 == arr.length) {
        return Object.entries(acc)
            .filter(([_, characters]) => characters.length === 1)
            .map(([_, characters]) => characters[0]);
    }

    return acc;
};

const soloCharacters = characters
    .reduce(groupByUniverse, {})

    //You are using groupByUniverse to create a new object, {} is the initial value of the accumulator, which share the same universe. So the new object will have universes as keys and empty array as its value initially. It showcases that you can use the reducer function to create new values.
    .map((character) => character.name)
    .join(", ");

console.log("soloCharacters:", soloCharacters);

// ----------------------------------------------------------
// COMBINED PRACTICE 4
// ----------------------------------------------------------

// What is the average power level across all characters?

// expected output: 68.71319452795147

// solution:
const avgPowerLvl = characters.map((c) => c.power_level).reduce((acc, curr, i) => (acc += curr) / i);

console.log("avgPowerLvl:", avgPowerLvl);
