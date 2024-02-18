// 1. Create a function that when passed as a callback to the Higher Order function provided, makes the final return the number's square plus two


const square = (n) => n*n

const addTwo = (callback) => {
  return callback() + 2
}



// 2. Create a Higher Order Function that could take this callback to return a greeting

const createFullName = (first_name, last_name, title) => {
  return (first_name, last_name, title) => `${title} ${first_name} ${last_name}`
}

const greetFlo = createFullName("Flo", "Ri", "Mr.");

console.log(greetFlo)

// you might notice that this function is less than ideal - that's great! We'll talk about why next