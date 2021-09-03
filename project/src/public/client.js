
let store = {
    apiBaseUrl: 'http://localhost:3000',
    imageAssetsPath: '/assets/images',
    app: { title: "Mars Rover Exploration" },
    rovers: undefined
}

const roverNames = ["Curiosity", "Opportunity", "Spirit"];

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const updateRovers = (store, newRoverState) => {
    store = Object.assign(store, {rovers: newRoverState});
}

const render = async (root, state) => {
    root.innerHTML = await App(state)
    setButtonClickEventListeners(state)
}

// create content
const App = async (state) => {
    let rovers = await getMarsRovers(state);

    return `
        <header>${AppGreeting(store.app.title)}</header>
        <main>
            <section class='rover-cards'>
                ${RenderNasaRovers(state, rovers)}
            </section>

            <section id='gallery' class='rover-gallery'>
                ${RenderGallery()}
            </section>
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

const AppGreeting = (title) => {
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

    if (!rover) {
        console.error("Rover is undefined");
        return;
    }
    return (`
        <div class="card col-sm-6 col-md-3">
            <img class="card-img-top" height="200px" src='${state.imageAssetsPath}/${rover.name.toLowerCase()}_card_image.jpg' alt="${rover.name} image">
            <div class="card-body">
                <h5 class="card-title">${rover.name}</h5>
                <p class="card-text rover-details">
                    <span>Launch Date: ${rover.launch_date}</span>
                    <span>Landing Date: ${rover.landing_date}</span>
                    <span>Status: ${rover.status}</span>
                    <span>Max Sol: ${rover.max_sol}</span>
                </p>
                <button type="button" id="btn-${rover.name}" class="btn btn-primary">View More Information</button>
            </div>
        </div>
    `)
}

const RenderGallery = () => {
    return (`
        <div id="roverGalleryControls" class="carousel slide hide" data-ride="carousel">
            <div class="carousel-inner" style=" width:100%; height: 500px !important;"></div>
            <a class="carousel-control-prev" href="#roverGalleryControls" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#roverGalleryControls" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    `)
}

const setButtonClickEventListeners = (state) => {
    const rovers = state.rovers
    rovers.forEach((rover) => {
        document.getElementById(`btn-${rover.name}`).addEventListener('click', function() {
            let element = document.querySelector('#roverGalleryControls');
            element.classList.remove('hide');
            let carouselElement = document.querySelector('.carousel-inner');
            carouselElement.innerHTML = RenderRoverSlides(rover);
        });
    });
}

const RenderRoverSlides = (rover) => {
    let sliderInnerHtml = "";
    rover.photos.forEach((photo, index) => {
        sliderInnerHtml += `
            <div class="carousel-item ${index == 1 ? 'active' : ''}">
                <img class="d-block w-100" src="${photo.image}" alt="${rover.name} slide">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Camera used: ${photo.camera}</h5>
                    <p>${photo.photo_date}</p>
                </div>
            </div>
        `;
    })
    return sliderInnerHtml;
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

const getMarsRovers = async (state) => {
    let rovers = state.rovers ?? JSON.parse(localStorage.getItem("rovers")) ?? [];

    if (!rovers || rovers.length == 0) {
        rovers = (await Promise.all(roverNames.map(async roverName => {
            
            const result = await Promise.all([getRoverInfo(roverName), getRoverPhotos(roverName)])
            const roverInfo = result[0];
            const roverPhotos = result[1];

            roverInfo.photos = roverPhotos;

            return roverInfo;
        }))).map(rover => rover);

        localStorage.setItem("rovers", JSON.stringify(rovers));
    }
    
    updateRovers(state, rovers);
    return rovers;
}


// API Calls
const getRoverInfo = async (rover_name) => {
    let roverInfo = await fetch(`${store.apiBaseUrl}/manifests/${rover_name}`)
        .then(res => res.json())

    return roverInfo.mars_rover;
}

const getRoverPhotos = async (rover_name) => {
    let roverPhotos = await fetch(`${store.apiBaseUrl}/photos/${rover_name}`)
            .then(res => res.json())

    return roverPhotos;
}

const getImageOfTheDay = (state) => {

    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))
}
