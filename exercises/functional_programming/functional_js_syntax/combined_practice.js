const characters = [
  {
    name: 'Marvin the Paranoid Android',
    role: 'First Mate',
    universe: 'Hitchhikers Guide to the Galaxy',
    weapon: 'severe depression',
    power_level: 1000
  },
  {
    name: 'Jabba the Hut',
    role: 'villain',
    universe: 'Star Wars',
    weapon: 'henchmen',
    power_level: 200
  },
  {
    name: 'Zoë Alleyne Washburne',
    role: 'First Mate',
    universe: 'Firefly',
    weapon: 'Winchester Model 1892 rifle',
    power_level: 160
  },
  {
    name: 'Peter Venkman',
    role: 'Ghostbuster',
    universe: 'Ghostbusters',
    weapon: 'proton pack',
    power_level: 120
  },
  {
    name: 'Kathryn Janeway',
    role: 'Captain',
    universe: 'Star Trek',
    weapon: 'Wit',
    power_level: 140
  },
  {
    name: 'Dr. Daniel Jackson',
    role: 'Archeologist',
    universe: 'Stargate',
    weapon: 'Zat gun',
    power_level: 120
  },
  {
    name: 'Q',
    role: 'God/Eternal',
    universe: 'Star Trek',
    weapon: 'Whatever he wants',
    power_level: 1000
  },
  {
    name: 'Boba Fett',
    role: 'Bounty Hunter',
    universe: 'Star Wars',
    weapon: 'EE-3 carbine rifle',
    power_level: 400
  },
  {
    name: 'Yoda',
    role: 'Jedi Master',
    universe: 'Star Wars',
    weapon: 'The Force',
    power_level: 900
  },
  {
    name: 'Mal Reynolds',
    role: 'Captain',
    universe: 'Firefly',
    weapon: 'pistol',
    power_level: 160
  },
  {
    name: 'Spock',
    role: 'First Mate',
    universe: 'Star Trek',
    weapon: 'Logic',
    power_level: 170
  },
  {
    name: 'R2-D2',
    role: 'Ship`s Robot',
    universe: 'Star Wars',
    weapon: 'Data Probe',
    power_level: 250
  },
  {
    name: 'Lore',
    role: 'Villain',
    universe: 'Star Trek',
    weapon: 'Intellect',
    power_level: 800
  },
]

// ----------------------------------------------------------

// COMBINED PRACTICE 1

// ----------------------------------------------------------

// Create an array containing only the names of Captains from all universes.

// Your Code here
const captains = characters.filter(element => element.role === "Captain").map(element => element.name)

console.log(captains)

// expected output: ['Mal Reynolds', 'Kathryn Janeway']

// ----------------------------------------------------------

// COMBINED PRACTICE 2

// ----------------------------------------------------------

// Group all characters by universe in a multidimensional array

// Your Code here

const universeGroups = characters.reduce((acc, curr, i, arr) => {
  acc[curr.universe] = acc[curr.universe] === undefined ? [] : acc[curr.universe] // for initally creating an empty array []
  acc[curr.universe].push(curr) // push current obejct to corresponding array index

  if (i + 1 == arr.length) { // for last element within reducer call return values only
    return Object.values(acc)
  }

  return acc
}, {}
)

// expected output:

console.log(universeGroups)

// [ 
//  [ 
//    { name: 'Marvin the Paranoid Android',
//       role: 'First Mate',
//       universe: 'Hitchhikers Guide to the Galaxy',
//       weapon: 'severe depression',
//       power_level: 1000 
//     } 
//   ],
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

// ----------------------------------------------------------

// COMBINED PRACTICE 3

// ----------------------------------------------------------

// Create an array containing characters' names who are the only character listed in their universe.

// Your Code here

console.log("EXERCISE 3 ##################")

const containtCharacters = characters.reduce((acc, curr, i, arr) => {

  acc[curr.universe] = acc[curr.universe] === undefined ? [] : acc[curr.universe] // for initally creating an empty array []
  acc[curr.universe].push(curr) // push current obejct to corresponding array index

  if (i + 1 == arr.length) { // for last element within reducer call return values only --> reduced to one value/array
    return Object.entries(acc)
      .filter(([_, element]) => element.length === 1)
      .map(([_, element]) => element[0].name)
  }
  return acc
}, {}
)

console.log(containtCharacters);

// expected output: [ Marvin the Paranoid Android, Peter Venkman, Dr. Daniel Jackson ]

// ----------------------------------------------------------

// COMBINED PRACTICE 4

// ----------------------------------------------------------

// What is the average power level across all characters?

// Your code here

// expected output: 68.71319452795147

const averagePower = characters
  .map (element => element.power_level)
  .reduce ((acc, element, index, array) => {
    if ( index + 1 === array.length)
    {
      return acc/(index+1)
    }
    return acc = element + acc;
  })

const sum = characters.map (element => element.power_level)

// // expected output: 355.38461538461536
console.log(averagePower);

// expected output: 68.71319452795147
const avgPowerLvl = characters
    .map(c => c.power_level)
    .reduce((acc, curr, i) => (acc += curr) / i)

console.log('avgPowerLvl:', avgPowerLvl)