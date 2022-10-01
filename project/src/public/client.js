let store = {
    user: { name: 'Nick' },
    currentRover: '',
    roverInfo: '',
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


// create content
const App = (store) => {
    let { rovers, roverInfo } = store

    return `
        <header>NASA Mars Rover Dashboard</header>
        <main>
            ${Greeting(store.user.name)}
            <section>
                ${RoverInfo(store)}
            </section>
        </main>
        <footer>Nicholas Cunningham</footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    console.log("========== DEBUG: Page loaded ==========")
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

const Greeting = (name) => {
    return (name ? `<h1>Welcome, ${name}!</h1>` : `<h1>Hello!</h1>`)
}

const RoverInfo = (store) => {
    console.log("========== DEBUG: made it to RoverInfo() ==========")

    // Get rover info on initial run
    if (!store.currentRover) {
        getRoverInfo(store)
    }
    
    
    return (
        `
        ${createAllRoverCards(store, createRoverCard)}
        <button onClick="updateStore({currentRover: '', roverInfo: ''})>Click Me!</button>
        `
    )
}

// ------------------------------------------------------  HELPERS
const createAllRoverCards = (store, cardCreator) => {
    console.log("========== DEBUG: made it to createAllRoverCards() ==========")
    return `${store.rovers.map(rover => cardCreator(rover)).join('')}`
}

const createRoverCard= (rover) => {
    console.log("========== DEBUG: made it to createRoverCard() ==========")

    return (
        `
        <div>
            <h1 class='card-title'>You have selected the ${rover} rover</h1>
            <button type="button" onClick="setTimeout(updateStore, 1000, store, {currentRover: '${rover}'">Click me!</button>
        </div>
        `
    )
}

// // Example of a pure function that renders infomation requested from the backend
// const ImageOfTheDay = (apod) => {

//     // If image does not already exist, or it is not from today -- request it again
//     const today = new Date()
//     const photodate = new Date(apod.date)
//     console.log(photodate.getDate(), today.getDate());

//     console.log(photodate.getDate() === today.getDate());
//     if (!apod || apod.date === today.getDate() ) {
//         getImageOfTheDay(store)
//     }

//     // check if the photo of the day is actually type video!
//     if (apod.media_type === "video") {
//         return (`
//             <p>See today's featured video <a href="${apod.url}">here</a></p>
//             <p>${apod.title}</p>
//             <p>${apod.explanation}</p>
//         `)
//     } else {
//         return (`
//             <img src="${apod.image.url}" height="350px" width="100%" />
//             <p>${apod.image.explanation}</p>
//         `)
//     }
// }





// ------------------------------------------------------  API CALLS

const getRoverInfo = (store) => {
    console.log("========== DEBUG: made it to getRoverInfo() ==========")

    let { currentRover } = store

    fetch(`http://localhost:3000/${currentRover}`)
        .then(res => res.json())
        .then(roverInfo => updateStore(store, { roverInfo }))
}
