// Use Object.keys with the map method to print "This character has a(n) [property-name]" for each property

const character = {
    id: '12mn18udcbv9823',
    name: 'Chewbacca',
    race: 'Wookie',
    planet: 'Kashyyyk',
    job: 'First Mate'
};

console.log(Object.keys(character));

const print = Object.keys(character)

print.map = ((x) => {
    return "This character has a(n) " + x
})

console.log (print.map)


// SOLUTION CODE
const keys = Object.keys(character)

keys.map(key => {
    console.log(`This character has a(n) ${key}`)
    return `This character has a(n) ${key}`
})

// Expected Output: 
// This character has a(n) id.
// This character has a(n) name.
// This character has a(n) race.
// This character has a(n) planet.
// This character has a(n) job.
// [ 'This character has a(n) id',  'This character has a(n) name',  'This character has a(n) race', 'This character has a(n) planet', 'This character has a(n) job' ]

