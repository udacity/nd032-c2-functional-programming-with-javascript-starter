let store = {
    currentRover: '',
    roverInfo: '',
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
    user: { name: 'Nick' },
    selectedDate: ''
}

const roverStats = { 
    "Opportunity": {
        "name": "Opportunity",
        "landing_date": "2004-01-25",
        "launch_date": "2003-07-07",
        "status": "complete",
        "max_sol": 5111,
        "max_date": "2018-06-11",
        "total_photos": 198439
    },
    "Curiosity": {
        "name": "Curiosity",
        "landing_date": "2012-08-06",
        "launch_date": "2011-11-26",
        "status": "active",
        "max_sol": 3622,
        "max_date": "2022-10-14",
        "total_photos": 601809
    },
    "Spirit": {
        "name": "Spirit",
        "landing_date": "2004-01-04",
        "launch_date": "2003-06-10",
        "status": "complete",
        "max_sol": 2208,
        "max_date": "2010-03-21",
        "total_photos": 124550
    }
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = async (store, newState) => {
    store = Object.assign(store, newState)
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
        console.log(`========== DEBUG: No rover selected, creating rover buttons ==========`)

        return `
            <p><b>Please choose a rover to learn about:</b></p>
            ${createAllRoverButtons(createRoverButton)}
        `
    } 

    // Once a rover is selected, call the API with a random date in the range
    if (currentRover && !roverInfo) {
        console.log(`==================== DEBUG: No rover info, calling API ====================`)

        getRoverInfo(getRandomDate())
        return ''
    }

    // Check if the call to getRoverInfo returned a rover with no photos available
    if (roverInfo && roverInfo.image.photos.length < 1) {
        return `${buildPage(buildFailurePage)}`
    }

    return `${buildPage(buildSuccessPage)}`
}


// ------------------------------------------------------  HELPERS

// HOF taking cardCreator as a parameter, per project requirements
const createAllRoverButtons = (cardCreator) => {
    // Map each rover to its card, per project requirements
    return `${store.rovers.map(rover => cardCreator(rover)).join(' ')}`
}

const createRoverButton = (rover) => {
    return (`<button type="button" onClick="setTimeout(updateStore, 100, store, {currentRover: '${rover}'})">${rover}</button>`)
}

const getRandomDate = () => {
    const { currentRover } = store
    const startDate = new Date(roverStats[currentRover].landing_date)
    const endDate = new Date(roverStats[currentRover].max_date)
    let selectedDate = new Date(+startDate + Math.random() * (endDate - startDate))

    return selectedDate.toISOString().replace(/T.*/,'')
}

const createPhotoCard = (imageURL) => {    
    return `
        <img src="${imageURL}">
    `
}

const createRoverInfoBlock = (roverInfo) => {
    const {launch_date: launchDate, landing_date: landingDate, status} = roverInfo

    return (`
        <ul>
            <li>Launch date: <b>${launchDate}</b></li>
            <li>Landing date: <b>${landingDate}</b></li>
            <li>Status: <b>${status}</b></li>
        </ul>
        <p>Current photo date: ${store.selectedDate}</p>
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
                <button
                    type="button"
                    onClick="setTimeout(updateStore, 100, store, store)"
                >
                    Randomize Photo 
                </button>
                <button
                    type="button"
                    onClick="setTimeout(updateStore, 100, store, {roverInfo: ''})"
                > 
                    Randomize Date 
                </button>
                <button
                    type="button"
                    onClick="setTimeout(updateStore, 100, store, {currentRover: '', roverInfo: ''})"
                > 
                    Back 
                </button>
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
        <p>No photos available for ${store.currentRover} on ${store.selectedDate}</p>
        <button
            type="button"
            onClick="setTimeout(updateStore, 100, store, {currentRover: '', roverInfo: ''})"
        >
            Try again
        </button>
        `
    )
}

const getRoverInfo = (selectedDate) => {    
    let { currentRover } = store

    fetch(`http://localhost:3000/${currentRover}/${selectedDate}`)
        .then(res => res.json())
        .then(roverInfo => updateStore(store, { roverInfo, selectedDate }))
}
