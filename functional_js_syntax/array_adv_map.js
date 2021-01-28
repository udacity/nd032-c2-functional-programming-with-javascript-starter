// 1. TODO
["1", "2", "3"].map(parseInt)


// ----------------------------------------------------------
// REAL LIFE EXERCISES
// ----------------------------------------------------------
// One common thing we use map for in real life is to reformat objects to have a shape that is 
// better for our purposes. For instance, we only care about the value and first three characters 
// of the id for the races below. Use map to grab those values and create a new array with them.

var index = [
    {key: 1, sector: 10, t_score: 18, id: '1236n7e8', value: 'Klingon'},
    {key: 4, sector: 145, t_score: 12, id: '293847hs8', value: 'Minbari'},
    {key: 8, sector: 214, t_score: 5, id: '283hy8347', value: 'Cylon'},
    {key: 3, sector: 8346, t_score: 10, id: 'n9837ks857', value: 'Jawa'},
]

// Expected Output:
// [
//     {id: '123', value: 'Klingon'},
//     {id: '293', value: 'Minbari'},
//     {id: '283', value: 'Cylon'},
//     {id: 'n98', value: 'Jawa'},
// ]