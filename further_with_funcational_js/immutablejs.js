// import immutablejs.js
const Immutable = require('immutable');

// PART 1. Getting and Setting values
// Given the following object, make an update that turns name to 'Mal' and role to 'Captain'
const map1 = Immutable.Map({ 
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
});

const map2 = Immutable.Map({
  name: 'Mal',
  role: 'Captain',
  favoriteThing: {
      item: "Not complicated"
      },
  history: ["Browncoat sergeant"]
});

// YOUR TURN --------------------------------------------------------------
// create `map3` immutable object by merging `map1` and `map2`

console.log(map1.toJS())
console.log(map2.toJS())
console.log(map3.toJS())


// -----------------------------------------------------------------
// -----------------------------------------------------------------

// PART 2. More with objects
// This is a normal javascript object. It is very different from an Immutable Map
const obj = { d: 100, o: 200, g: 300 };

// But thankfully, normal javascript objects are still valid in Immutable
// Notice that here we can merge a normal object into an Immutable Map
const map4 = map1.merge(map2, obj);

// But also notice how different the two are when we console log map3 
console.log(map4.toJS())

// YOUR TURN --------------------------------------------------------------
// Can you locate the contents of our variable 'obj' inside the Immutable Map map3?

//Your code

// -----------------------------------------------------------------
// -----------------------------------------------------------------

// PART 3. Arrays and Immutable Lists

// An immutable array is called a LIST, and is declared like this:
const numbers = Immutable.List([1, 2, 3]);

// We can turn normal JS arrays into Immutable Lists like this:
const plainArray = [ 1, 2, 3, 4 ]
const listFromPlainArray = Immutable.List(plainArray)
console.log(listFromPlainArray.toJS())

// we can declare a new Immutable List
const myList = Immutable.List([ 'stuffed t-rex' ]);
console.log(Array.from(myList));

// and we can use the set method again to add or update values. Just provide the index first and value second
const myList1 = myList.set(1, 'toy lightsaber');
console.log(Array.from(myList1)); // [ "stuffed t-rex", "toy lightsaber" ]

// but, in order to not need to supply the index, we can also add new values with push
const myList2 = myList1.push('Picard bobblehead')
console.log(Array.from(myList2));

// YOUR TURN --------------------------------------------------------------------------

// 1. Turn the following array into an Immutable array
// 2. Add a character

// Your code

// -----------------------------------------------------------------
// -----------------------------------------------------------------


// STRETCH CHALLENGE ----------------------------------------------------------------------
// 3. Remove Jabba the Hut from the Immutable List
// look up in the documentation how you would remove a character from the Immutable list

const characters = [
  {
    name: 'Marvin the Paranoid Android',
    role: 'First Mate',
    universe: 'Hitchhikers Guide to the Galaxy',
    weapon: 'severe depression',
    powerLevel: 1000
  },
  {
    name: 'Jabba the Hut',
    role: 'villain',
    universe: 'Star Wars',
    weapon: 'henchmen',
    powerLevel:  200
  },
  {
    name: 'Zoë Alleyne Washburne',
    role: 'First Mate',
    universe: 'Firefly',
    weapon: 'Winchester Model 1892 rifle',
    powerLevel: 160
  },
  {
    name: 'Peter Venkman',
    role: 'Ghostbuster',
    universe: 'Ghostbusters',
    weapon: 'proton pack',
    powerLevel: 120
  },
  {
    name: 'Kathryn Janeway',
    role: 'Captain',
    universe: 'Star Trek',
    weapon: 'Wit',
    power_level: 140
  }
]
