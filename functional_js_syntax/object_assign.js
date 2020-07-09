// Merge another character into this state. Keep at least one value and change at least one value

let state = {
    name: 'Wash',
    ship: {
        name: 'Serenity',
        class: 'Firefly'
    },
    role: 'Pilot',
    favoriteThing: {
        item: "Toy",
        details: {
            type: 'Toy Tyrannosaurus Rex'
        }
    }
}

const incomingState = {
    name: 'Mal',
    role: 'Captain',
    favorite_thing: {
        item: "Not complicated"
    },
    history: ["Browncoat sergeant"]
}

state = Object.assign(state, new_state);
// Object.assign(target, source)

// Resulting object
// state = { 
//     name: "Mal", 
//     ship: { 
//         name: "Serenity", 
//         class: "Firefly" 
//     }, 
//     role: "Captain", 
//     favoriteThing: { 
//         item: "Not complicated" 
//     }, 
//     history: ["Browncoat sergeant"] 
// } 

// Your Code here
