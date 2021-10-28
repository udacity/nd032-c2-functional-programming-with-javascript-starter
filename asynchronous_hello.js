/>home>workspace
1
// Welcome to a basic asynchronous program!
2
// This is a quick peek ahead into some of the syntax we'll be going over in the next lesson
3
​
4
​
5
// Notice how the console log for "Hello" comes AFTER "World",  yet when the program runs, the words appear in the correct order!
6
const printHelloWorld = () => {
7
  
8
  setTimeout(console.log, 2000, "World");
9
  
10
  console.log("Hello ");
11
}
12
​
13
printHelloWorld();
14
​
15
// CHALLENGE - Move the setTimeout after the console log, does that change the outcome? 
16
​
17
// CHALLENGE - Edit the time elapsed between "Hello" and "World" appearing on the screen
18
​
19
// CHALLENGE - Edit the message being sent to have three parts:
20
// Part 1: "I'm " - shows up immediately
21
// Part 2: "async" - shows up 2 seconds after "I'm"
22
// Part 3: "...ronous!" - shows up 4 seconds after "async"
23
​
24
// Extra Challenge - if you want to go even further with it, time each of the dots in the ellipses of part 3
25
// Write a function to make each dot appear one second after the other.