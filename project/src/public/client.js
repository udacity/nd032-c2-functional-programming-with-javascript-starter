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
    let { user, currentRover, rovers, roverInfo } = store

    return `
        <header><h1>NASA Mars Rover Dashboard</h1></header>
        <main>
            ${Greeting(user.name)}
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
    console.log("========== DEBUG: made it to RoverInfo() ==========")
    
    let { user, currentRover, rovers, roverInfo } = store
    
    // Create rover cards on page load so we can select a rover
    if (!currentRover) {
        return `
        <p>Please choose a rover to learn about:</p>
        ${createAllRoverCards(store, createRoverCard)}
        `
    }
    
    // Store rover info from API call (and return to avoid accessing undefined data)
    if (!roverInfo) {
        getRoverInfo(store)
        return ''
    }
    
    
    
    
    
    // ==================== TODO: Figure out why Spirit doesn't produce any pictures (and account for that if needed) ====================
    
    
    
    
    
    // ==================== TODO: Finish styling and make sure it works on all different screen sizes ====================
    
    
    
    
    
    
    
    let randomPhotoIndex = Math.floor(Math.random() * roverInfo.image.photos.length)
    return (
        `
        <h3 class='card-title'>${currentRover}</h2>
        <div>
            ${createRoverInfoBlock(currentRover)}
        </div>
        <div>
            <button type="button" onClick="setTimeout(updateStore, 100, store, {currentRover: '', roverInfo: ''})">Reset</button>
        </div>
        <div>
            ${createPhotoCard(roverInfo.image.photos[randomPhotoIndex].img_src)}
        </div>
        `
    )
}


// ------------------------------------------------------  HELPERS

// HOF taking cardCreator as a parameter, per project requirements
const createAllRoverCards = (store, cardCreator) => {
    console.log("========== DEBUG: made it to createAllRoverCards() ==========")
    // Map each rover to its card, per project requirements
    return `${store.rovers.map(rover => cardCreator(rover)).join('')}`
}

const createRoverCard= (rover) => {
    console.log("========== DEBUG: made it to createRoverCard() ==========")

    return (
        `
        <button type="button" onClick="setTimeout(updateStore, 100, store, {currentRover: '${rover}'})">${rover}</button>
        `
    )
}

const createPhotoCard = (imageURL) => {
    console.log("========== DEBUG: made it to createPhotoCard() ==========")
    
    return (
        `
        <img src="${imageURL}">
        `
    )
}

const createRoverInfoBlock = (rover) => {
    const {launchDate, landingDate, status} = rover

    return (`
        <ul>
            <li>Launch date: ${launchDate}</li>
            <li>Landing date: ${landingDate}</li>
            <li>Status: ${status}</li>
        </ul>
    `)
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
