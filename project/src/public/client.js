
let store = {
    baseUrl: 'http://localhost:3000',
    imageAssetsPath: '/assets/images',
    app: { title: "Mars Rover Exploration" },
    rover_manifest_details: undefined,
}

const roverNames = ["Curiosity", "Opportunity", "Spirit"];

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const updateRovers = (store, newRoverState) => {
    store = {...store, newRoverState};
}

const getMarsRovers = async (state) => {
    let rover_manifest_details = state.rover_manifest_details ?? JSON.parse(localStorage.getItem("rover_manifest_details")) ?? [];

    if (!rover_manifest_details || rover_manifest_details.length == 0) {
        rover_manifest_details = (await Promise.all(roverNames.map(roverName => getRoverManifest(roverName)))).map(data => data.manifest_data);

        localStorage.setItem("rover_manifest_details", JSON.stringify(rover_manifest_details));
        updateRovers(state, rover_manifest_details);
    }

    return rover_manifest_details;
}

const render = async (root, state) => {
    root.innerHTML = await App(state)
}


// create content
const App = async (state) => {
    let rovers = await getMarsRovers(state);

    return `
        <header>${Greeting(store.app.title)}</header>
        <main>
            <section>
                ${await RenderNasaRovers(state, rovers)}
            </section>
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

const Greeting = (title) => {
    if (title) {
        return `
            Welcome to ${title}!
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

const RenderNasaRovers = (state, rovers) => {
    return rovers.map(rover => {
        return RenderRoverCard(state, rover)
    }).reduce((initialItem, currentItem) => `${initialItem} ${currentItem}`);
}

const RenderRoverCard = (state, rover) => {
    return (`
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src='${state.imageAssetsPath}/${rover.name.toLowerCase()}_card_image.jpg' alt="${rover.name} image">
            <div class="card-body">
                <h5 class="card-title">${rover.name}</h5>
                <p class="card-text">
                    Random Text
                </p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    `)
}

const RenderGallery = () => {

}

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(apod.date)
    console.log(photodate.getDate(), today.getDate());

    console.log(photodate.getDate() === today.getDate());
    if (!apod || apod.date === today.getDate() ) {
        getImageOfTheDay(store)
    }

    // check if the photo of the day is actually type video!
    if (apod.media_type === "video") {
        return (`
            <p>See today's featured video <a href="${apod.url}">here</a></p>
            <p>${apod.title}</p>
            <p>${apod.explanation}</p>
        `)
    } else {
        return (`
            <img src="${apod.image.url}" height="350px" width="100%" />
            <p>${apod.image.explanation}</p>
        `)
    }
}

// API Calls
const getRoverManifest = async (rover_name) => {
    let roverManifestData = await fetch(`${store.baseUrl}/manifests/${rover_name}`)
        .then(res => res.json())

    return roverManifestData;
}

const getImageOfTheDay = (state) => {

    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))
}
