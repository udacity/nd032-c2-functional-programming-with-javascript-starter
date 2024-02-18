// -----------------------------------------------------------------
// Exercise 1
// Directions: Write a pure function that prints "good afternoon" if
//       its afternoon and "good morning" any other time of the day.
// Hint - this will help with time of day: new Date().getHours()
// -----------------------------------------------------------------

const greeting = () => {
    const time = new Date().getHours()
    if (time > 12 && time < 17)
    {
        return "good afternoon";
    }
    else
    {
        return "good morning";
    }
}



// -----------------------------------------------------------------
// Exercise 2
// Directions: Write a pure function that takes in a number and  
//       returns an array of items counting down from that number to 
//       zero.
// -----------------------------------------------------------------

const getArray = (number) => {
    let array = [];
    let i = 0;
    for (i=0; i<number; i++)
    {
        array[i] = (number-1) - i; 
    }
    return array;
}

console.log(greeting());
console.log(getArray(12));