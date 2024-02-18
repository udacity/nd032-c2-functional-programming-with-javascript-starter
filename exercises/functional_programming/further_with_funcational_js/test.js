// import immutablejs.js
const Immutable = require('immutable');

let store = Immutable.Map({
    user: Immutable.Map({ name: "Student" }),
    apod: "",
    rovers: Immutable.List([]),
    currentRover: "none"
  })
  



const apod = {
    name: "hello",
    title: "mr"
}

console.log("before: ")
console.log(store.toJS())

store = store.merge( {apod} )

console.log("after: ")
console.log(store.toJS())