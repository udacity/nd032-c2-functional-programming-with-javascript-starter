let store = {
    user: {
        name: "Student"
    },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
    curiosity: '',
}

// add our markup to the page
const root = document.getElementById('root');

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => { 
    root.innerHTML = App(state);
    renderStats(state.curiosity);
    document.querySelectorAll('.nav-item').forEach(x => {
        x.addEventListener('click', function () {
            document.querySelector('.selected').classList.remove('selected');
            x.classList.add('selected');
            getRoverManifest(x.innerText, store);
        });
    })
}

function renderNavItems(rovers) {
    // we probably need to use immutable here to avoid mutating the navItems string
    let navItems = '';
    rovers.forEach((v, i, a) => {
        navItems = navItems + `<div class="nav-item${(i === 0) ? ' selected' : ''}">${v}</div>\n`;
    });
    return navItems;
}

// create content
const App = (state) => {   
    let { rovers, apod, curiosity } = state;
    return `
    <header class="column">
            <h1>Mars Rover Dashboard</h1>
            <p>Select a Rover to view details and recent photos.</p>
        </header>
        <nav>
            ${renderNavItems(state.rovers)}
        </nav>
        <div id="stats" class="column">
            ...LOADING...
        </div>
        <div id="photos" class="column">
            
        </div>
    `;
}



function renderStats(thisRover) {
    document.getElementById('stats').innerHTML = `
        <div class="row"><span class="stats-key">Status:</span><span id="status" class="stats-value">${thisRover.status}</span></div>
        <div class="row"><span class="stats-key">Launch Date:</span><span id="launch-date" class="stats-value">${new Date(thisRover.launchDate).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}</span></div>
        <div class="row"><span class="stats-key">Landing Date:</span><span id="landing-date" class="stats-value">${new Date(thisRover.landingDate).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}</span></div>
        <div class="row"><span class="stats-key">Mission Duration:</span><span id="time-on-mars" class="stats-value">${thisRover.missionDuration}</span></div>
        <div class="row"><span class="stats-key">Total Photos:</span><span id="total-photos" class="stats-value">${thisRover.totalPhotos}</span></div>
        `;
                // <div class="row"><span class="stats-key">Name:</span><span id="rover-name" class="stats-value">${thisRover.name}</span></div>

    renderPhotos(thisRover);
}

function renderPhotos(thisRover) {
    document.getElementById('photos').innerHTML = `
        <hr>
        <p>Photos from ${thisRover.maxDate}</p>
        <hr>
        <div id="gallery">
        </div>
        `;
    const gallery = document.getElementById('gallery');
    fetch(`/photos/${thisRover.name}/${thisRover.maxDate}`)
        .then(res => res.json())
        .then(data => {
            const photos = data.photos;
            photos.forEach(x => {
                const html = `
                <div class="rover-photo">
                    <div class="rover-photo-caption">${x.camera.name}, ID ${x.id}</div>
                    <img class="rover-image" src="${x.img_src}" alt="hi!">
                </div>
                `
                gallery.insertAdjacentHTML('beforeend', html)

            })

        });


}

const getCuriosityManifest = (state) => {
    let {
        curiosity
    } = state;
    let rover = 'curiosity';
    fetch(`/rover/${rover}`)
        .then(res => res.json())
        .then(curiosity => {
            updateStore(store, {
                curiosity
            });
        });
    return;

};

const getRoverManifest = (rover, state) => {
    document.getElementById('stats').innerHTML = `<img class="loading" src="assets/images/loading.gif" alt="">`;
    document.getElementById('photos').innerHTML = ``;
    fetch(`/rover/${rover}`)
        .then(res => res.json())
        .then(thisRover => {
            // maybe insert rover data into the store after it has been summoned, so it loads faster next time
            renderStats(thisRover);
        });
};

// const getRoverPhotos = (rover, state) => {
//     console.log(rover);
//     fetch(`http://localhost:3000/photos/${rover.name}/${rover.maxDate}`)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data);
//         });
// };


// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    getCuriosityManifest(store);
});