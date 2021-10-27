// 1. Create a function that when passed as a callback to the Higher Order function provided, makes the final return the number's square plus two
const addTwo = (callback) => {
  return callback() + 2
}


//solution:

const addTwo = (callback) => {
  return callback(2) + 2
}
const square = (x) => {
  return x*x
}
const result = addTwo(square);
console.log(result);



// Notice in line 7 we have passed the function square to be the callback function (without the parenthesis since we are not calling it yet) and inside the higher order function we are calling the callback function and passing a number to get its square, currently we have passed 2 to the callback function, that way it will return a 4 and then before we return another 2 will be added to the final results and we get a 6.

// As an improvement, we can allow the higher order function to take another argument which is the number to be squared and we can use that argument when we call the callback function at line(2). Here is the updated code:

const addTwo = (callback, n) => {
  return callback(n) + 2 // the callback function here is the square function we passed to addTwo and it takes one number in its argument and returns the square of that number
}
const square = x => x*x;
console.log(addTwo(square, 2))

// 2. Create a Higher Order Function that could take this callback to return a greeting

const createFullName = (first_name, last_name, title) => {
  return `${title} ${first_name} ${last_name}`
}


// solution: 
const greeting = (callback) => {
  return `Hello ${callback( 'Robert', 'C','Mr.')}`
}

console.log(greeting(createFullName))
// you might notice that this function is less than ideal - that's great! We'll talk about why next