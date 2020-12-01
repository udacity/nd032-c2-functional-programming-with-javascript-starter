// Directions: Translate from normal function to pure function
// let greeting = 'Hello, '

// const greet = (name) => {
//     let greeting = 'Hello, '
//     return greeting += name
// }

// this code could be problematic because greeting is in the global scope. 
// We could not use the greeting a second time, because the greeting variable is changed to contain the name

// console.log(greet('Arthur.'))
// console.log(greet('Arthur.'))
// console.log(greet('Ben.'))
// expected output: 
//  Hello, Arthur. 
//  Hello, Arthur.

// Udacity Solution
const greet = (name, base_greeting) => {
    return `${base_greeting} ${name}`
}

let greeting = 'Hello, '

greet('Arthur.', greeting)
// now we can reuse greeting, and the greet function is pure

console.log(greet('Arthur.', greeting)) 
// expected output: 
//  Hello, Arthur. 
//  Hello, Arthur.