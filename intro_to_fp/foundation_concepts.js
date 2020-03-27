// Directions: Translate from normal function to pure function
let greeting = 'Hello, '

const greet = (name) => {
    return greeting += name
}

// this code could be problematic because greeting is in the global scope. 
// We could not use the greeting a second time, because the greeting variable is changed to contain the name

console.log(greet('Arthur.'))
console.log(greet('Arthur.'))
// expected output: 
//  Hello, Arthur. 
//  Hello, Arthur.
