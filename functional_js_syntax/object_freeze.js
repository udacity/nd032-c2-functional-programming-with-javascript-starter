// ----------------------------------------------------------
// OBJECT FREEZE EXAMPLE from Video
// ----------------------------------------------------------

// Note here that we must run Javascript in strict mode in order to see the error correctly
// Node runs in strict mode automatically, as do many online code editors, so if you are running these examples in the terminal or online you probably won't need this
// If you want to learn more about strict mode, here is a good article: https://www.geeksforgeeks.org/strict-mode-javascript/

"use strict";

const currentShow = {
    title: 'Dr. Who',
    seasons: 11,
    currentSeason: 4
}

// as a const, we can do this:
currentShow.currentSeason = 5

// but if we freeze the object
Object.freeze(currentShow);

currentShow.currentSeason = 5;
// Throws an error and current_season remains unchanged


// OBJECT FREEZE EXERCISE

// ----------------------------------------------------------
// Directions: Create your own object and freeze it!
