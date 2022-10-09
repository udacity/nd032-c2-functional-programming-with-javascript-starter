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
    console.log("========== DEBUG: Store updated ==========")
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


// create content
const App = (store) => {
    return `
        <header><h1>NASA Mars Rover Dashboard</h1></header>
        <main>
            ${Greeting(store.user.name)}
            <section>
                ${RoverInfo(store)}
            </section>
        </main>
        <footer>
            Page created by Nicholas Cunningham
            for Udacity Intermediate JavaScript Course
        </footer>
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
    let { currentRover, roverInfo } = store
    
    // Create rover buttons on initial page load so we can select a rover
    if (!currentRover) {
        return `
            <p><b>Please choose a rover to learn about:</b></p>
            ${createAllRoverButtons(store, createRoverButton)}
        `
    }
    
    // Store rover info from API call (and return to avoid accessing undefined data)
    if (!roverInfo) {
        getRoverInfo(store)
        return ''
    }
    
    // Check if the call to getRoverInfo returned a rover with no photos available
    // As of this writing, Spirit rover have no available photos on the API call
    if (roverInfo && roverInfo.image.photos.length < 1) {
        return `${buildPage(buildFailurePage)}`
    }

    return `${buildPage(buildSuccessPage)}`
}


// ------------------------------------------------------  HELPERS

// HOF taking cardCreator as a parameter, per project requirements
const createAllRoverButtons = (store, cardCreator) => {
    // Map each rover to its card, per project requirements
    return `${store.rovers.map(rover => cardCreator(rover)).join('')}`
}

const createRoverButton= (rover) => {
    return (`<button type="button" onClick="setTimeout(updateStore, 100, store, {currentRover: '${rover}'})">${rover}</button>`)
}

const createPhotoCard = (imageURL) => {    
    return `<img src="${imageURL}">`
}

const createRoverInfoBlock = (roverInfo) => {
    const {launch_date: launchDate, landing_date: landingDate, status} = roverInfo

    return (`
        <ul>
            <li>Launch date: <b>${launchDate}</b></li>
            <li>Landing date: <b>${landingDate}</b></li>
            <li>Status: <b>${status}</b></li>
        </ul>
    `)
}

// ------------------------------------------------------  PAGE BUILDERS

// HOF #2
const buildPage = (pageBuilder) => {
    return (
        `
        <h3 class='card-title'>Current Rover: ${store.currentRover}</h2>
        ${pageBuilder()}
        `
    )
}

const buildSuccessPage = () => {
    const { roverInfo } = store
    let randomPhotoIndex = Math.floor(Math.random() * roverInfo.image.photos.length)

    return (
        `
        <div class='row'>
            <div class='col'>
                ${createRoverInfoBlock(roverInfo.image.photos[0].rover)}
                <button type="button" onClick="setTimeout(updateStore, 100, store, store)"> Randomize Photo </button>
                <button type="button" onClick="setTimeout(updateStore, 100, store, {currentRover: '', roverInfo: ''})"> Back </button>
            </div>
            <div class='col'>
                ${createPhotoCard(roverInfo.image.photos[randomPhotoIndex].img_src)}
            </div>
        </div>
        `
    )
}

const buildFailurePage = () => {
    return (
        `
        <p>No information currently available for ${store.currentRover}</p>
        <button type="button" onClick="setTimeout(updateStore, 100, store, {currentRover: '', roverInfo: ''})"> Back </button>
        `
    )
}


// ------------------------------------------------------  API CALLS
const getRoverInfo = (store) => {
    console.log("========== DEBUG: made it to getRoverInfo() ==========")
    
    let { currentRover } = store
    console.log({currentRover})

    fetch(`http://localhost:3000/${currentRover}`)
        .then(res => res.json())
        .then(roverInfo => updateStore(store, { roverInfo }))
}
