// Below is the code from the lesson

let store = {
    user: {
        first_name: 'John',
        last_name: 'Doe'
    }
}

const render = (root, state) => {
    root.innerHTML = App(state)
}

const Welcome = (name) => {
    return `Welcome, ${name} to my Javascript Program!`
}

const App = (state) => {
    return `
       <h1>${Welcome(state.user.first_name)}<h1>
      <div> I EXIST! </div>
   `
}

window.addEventListener('load', () => {
    render(root, store)
})

// But what if state changes at some point in our app?
// Using the object methods we have learned so far in this course, 
// create a function called updateStore that takes in the old state, the new state, and updates the old state with any new information
// This won't be a pure function, instead of a return, call the render method again

// Your Code