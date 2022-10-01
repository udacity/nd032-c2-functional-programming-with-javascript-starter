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
const App = (state) => {
    let { rovers, roverInfo } = state

    return `
        <header>NASA Mars Rover Dashboard</header>
        <main>
            ${Greeting(store.user.name)}
            <section>
                ${RoverInfo(state)}
            </section>
        </main>
        <footer>Nicholas Cunningham</footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

const Greeting = (name) => {
    return name ? <h1>Welcome, ${name}!</h1> : <h1>Hello!</h1>
}

const RoverInfo = (state) => {
    // Get rover selection on initial run
    if (!state.currentRover) {
        createAllRoverCards(state, createRoverCard)
    }

    getRoverInfo(state)

    return (
        <p>This is a sample of the rover data.</p>
    )
}

// ------------------------------------------------------  HELPERS
const createAllRoverCards = (state, cardCreator) => {
    return `${state.rovers.map(rover => cardCreator(state, rover))}`
}

const createRoverCard= (state, rover) => {
    return (
        `
        <h1 class='card-title'>You have selected the ${rover} rover</h1>
        <button onClick="setTimeout(updateStore, 1000, {currentRover: '${rover}'"></button>
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

// Example API call
const getRoverInfo = (state) => {
    let { currentRover } = state

    fetch(`http://localhost:3000/${currentRover}`)
        .then(res => res.json())
        .then(roverInfo => updateStore(store, { roverInfo }))

    return data
}
