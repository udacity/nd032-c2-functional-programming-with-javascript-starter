// 1. Take this disjointed sentence and turn it into a single string
// Your Code Here
const text = ['The ships', 'hung in the sky,', 'much the way', 'that bricks don`t']
const single = text.reduce((runningTotal, currentValue) => {
    return runningTotal + ' ' + currentValue
});

console.log(single);
// expected output: "The ships hung in the sky, much the way that bricks don't"
// ----------------------------------------------------------

// 2. Return the winning team
const scores = [
    {
        team: 'A',
        score: 20
    },
    {
        team: 'B',
        score: 17
    },
    {
        team: 'C',
        score: 23
    },
    {
        team: 'D',
        score: 13
    }
]

// Your Code Here
const winning = scores.reduce((highValue , currentValue) => {
    if(currentValue.score > highValue.score) {
        return currentValue;
    } else {
        return highValue;
    }
});

console.log(winning.team);
// expected output: "C"

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

// Your Code Here
const result = ships.reduce((previous, current) => {
    const speed = parseInt(current.speed.slice(0, -1))
    const previousSpeed = parseInt(previous.speed.slice(0, -1))
    if (speed > previousSpeed) {
        return current
    }
    return previous
}, { name: "none", speed: "0G"})

console.log(result.name)
// Expected output: Tie Fighters