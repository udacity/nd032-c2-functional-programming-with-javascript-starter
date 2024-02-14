
let store = Immutable.Map({
    user: Immutable.Map({ name: "duronflo" }),
    apod: "",
    rovers: Immutable.List(['curiosity', 'opportunity', 'spirit', 'perseverance']),
    currentRover: "none",
})

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (state, newState) => {
    store = state.merge(newState);
    render(root, store);
}


const render = async (root, state) => {
    root.innerHTML = App(state)
}

// create content
const App = (state) => {
    return `
        <header></header>
        <main>
            ${Greeting(state)}
                <section>
                    <div class="tab">
                        <button class="tablinks" onclick="loadHome()">HOME</button>
                        ${RoverButtons(state)}
                        

                    </div>
                </section>
                <section>         

                ${state.get("currentRover") === "none" 
                ?
                    ImageOfTheDay(state)
                : 
                    RoverDetails(state)}
                
                </section>
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store);
})
// ------------------------------------------------------  HELPERS
const toStrArgs = (args) => {
    return JSON.stringify(args).replace(/"/g, '\'')
}

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information 


const Greeting = (state) => {
    const name = state.get("user").get("name");
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }
    return `
        <h1>Hello!</h1>
    `
}

// pure function for creating menu with buttons

const RoverButtons = (state) => {
    const rovers = state.get("rovers").toJS();
    const roverMenuElements = rovers
        .map(element =>
            `<button class="tablinks" onclick="setRover('${element}')">${element.toUpperCase()}</button>`)
        .join("\n");
    return roverMenuElements


}

// home screen with astronomic picture

const loadHome = () => {
    const newState = store.set("currentRover", "none")
    updateStore(store, newState)
}

// set rover after clicking on corresponding button

const setRover = (roverName) => {
    getRoverData(roverName);
}

// pure function for displaying details and latest photos of rover

const RoverDetails = (state) => {
    const currentRover = state.get("currentRover");
    const ListDetails = (currentRover) =>
        Object.entries(currentRover).map((element) => {
            if (element[0] != "photos")
                return `<li>${element[0]}: ${element[1]}</li>`
        }).join("\n")
    
    const PhotoGallery = (currentRover) => {
        const photoCollection = currentRover.photos.map(element => {
            return (`
            <div class="gallery">
                <a target="_blank" href="${element.img_src}">
                    <img src="${element.img_src}" alt="${element.earth_date}" width="600" height="400">
                </a>
                <div class="desc">Captured with ${element.camera.full_name} </div>
            </div>
            `)
        }).join("\n")
        return photoCollection;
  
    }

    return (`
    <h2>Here some details to ${currentRover.name} rover.</h2>
    <ul>
        ${ListDetails(currentRover)}
    </ul> 
    ${PhotoGallery(currentRover)}    
    `)
}

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (state) => {
    const apod = state.get("apod")
    // If image does not already exist, or it is not from today -- request it again
    const today = new Date()
    const photodate = new Date(apod.date)
    console.log(photodate.getDate(), today.getDate());

    console.log(photodate.getDate() === today.getDate());
    if (!apod || apod.date === today.getDate()) {
        getImageOfTheDay(store);

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
            <p>${apod.image.explanation}</p>
            <img src="${apod.image.url}" height="350px" width="100%" />

        `)
    }
}



// ------------------------------------------------------  API CALLS

// get astronomic picture of the day

const getImageOfTheDay = async (state) => {
    let { apod } = state.get("apod");
    const response = await fetch(`http://localhost:3000/apod`)
    apod = await response.json() // get data from the promise returned by .json()
    const newState = store.set('apod', apod);
    updateStore(store, newState)
    return apod;
}

// getting rover manifest and images with two api-requests

const getRoverData = async ( roverName) => {
    const getRoverManifest = async (roverName) => {
        const response = await fetch(`http://localhost:3000/mission-manifest?rover=${roverName}`);
        const roverManifest = await response.json(); // get data from the promise returned by .json()
        return roverManifest;
    }

    const getRoverPhotos = async (roverName, maxSol) => {
        const response = await fetch(`http://localhost:3000/mars-photos?rover=${roverName}&sol=${maxSol}`);
        const latestPhotos = await response.json(); // get data from the promise returned by .json()
        return latestPhotos;
    }

    const roverManifest = await getRoverManifest(roverName);
    const latestPhotos = await getRoverPhotos(roverName, 100); 

    const newState = store.set('currentRover', {
        name: roverManifest.name,
        launch_date: roverManifest.launch_date,
        landing_date: roverManifest.landing_date,
        status: roverManifest.status,
        max_date: roverManifest.max_date,
        max_sol: roverManifest.max_sol,
        total_photos: roverManifest.total_photos,
        photos: latestPhotos

    });
    updateStore(store, newState)
}



