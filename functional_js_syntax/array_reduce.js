// 1. Take this disjointed sentence and turn it into a single string
const text = ["The ships", "hung in the sky,", "much the way", "that bricks don`t"];

// Your Code Here

const reducer = (sentence, phrase) => sentence + " " + phrase;
console.log(text.reduce(reducer));
// expected output: "The ships hung in the sky, much the way that bricks don't"

// ----------------------------------------------------------

// 2. Return the winning team
const scores = [
    {
        team: "A",
        score: 20,
    },
    {
        team: "B",
        score: 17,
    },
    {
        team: "C",
        score: 23,
    },
    {
        team: "D",
        score: 13,
    },
];


const high = scores.reduce((highValue, currentValue) => {
    if (currentValue.score > highValue.score) return currentValue;
    else return highValue;
});

console.log(high.team);

// expected output: "C"
// Explanation: In this example, highValue is the accumulator, and currentValue refers to an item in the array. This is a slightly more complicated example than the first exercise because we want to conditionally decide whether to update the accumulator or not. In this case, we only want to keep a running tally of the highest score, discarding any value unless it beats the accumulated high score. 



// ----------------------------------------------------------
//    REAL LIFE EXAMPLE
// Reduce can sometimes save us a lot of time -- if we remember to use it.
// Instead of writing a complicated map or filter method and then calling the
// name of the ship out of the retuned array, Return the name of the fastest
// star ship

const ships = [
    {
        name: 'Serenity',
        speed: '4.2G',
    },
    {
        name: 'Cylon Raider',
        speed: '7.5G',
    },
    {
        name: 'Swordfish II',
        speed: '50G',
    },
    {
        name: 'Tie Fighters',
        speed: '4100G',
    }
]

const result = ships.reduce((previous, current) => {
    const speed = parseInt(current.speed.slice(0, -1))
    const previousSpeed = parseInt(previous.speed.slice(0, -1))
    if (speed > previousSpeed) {
        return current
    }
    return previous
})

console.log(result.name)
// Expected output: Tie Fighters