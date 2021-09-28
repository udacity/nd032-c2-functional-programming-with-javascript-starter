// -----------------------------------------------------------------
// Exercise 1
// Directions: Write a pure function that prints "good afternoon" if
//       its afternoon and "good morning" any other time of the day.
// Hint - this will help with time of day: new Date().getHours()
// -----------------------------------------------------------------
timeOfDay = new Date().getHours();

const greet = (timeOfDay) => {
    if (timeOfDay > 12 && timeOfDay < 18) {
        return 'good afternoon'
        
    } else {
        "good morning"
    }

}


// -----------------------------------------------------------------
// Exercise 2
// Directions: Write a pure function that takes in a number and  
//       returns an array of items counting down from that number to 
//       zero.
// -----------------------------------------------------------------


const countDown = (number) => {
  for (let index = 0; index < number.length; index++) {
    return number[index];
  }
};