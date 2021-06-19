let store = {
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
};

const root = document.getElementById('root');

// const updateStore = (store, newState) => {
//     store = Object.assign(store, newState)
//     render(root, store)
// };

function renderNavItems(rovers) {
    let navItems = '';
    rovers.forEach((v, i, a) => {
        navItems = navItems + `<div class="nav-item${(i === 0) ? ' selected' : ''}">${v}</div>\n`;
    });
    return navItems;
}

// create content
const App = (state) => {   
    // let { rovers } = state;
    return `
    <header class="column">
            <h1>Mars Rover Dashboard</h1>
            <p>Select a Rover to view details and recent photos.</p>
        </header>
        <nav class="row">
            ${renderNavItems(state.rovers)}
        </nav>
        <div id="stats" class="column">
        </div>
        <div id="photos" class="column">
        </div>
        
    `;
};

function renderStats(thisRover) {
    console.log('rendering stats');
    
    document.getElementById('stats').innerHTML = `
        <div class="row"><span class="stats-key">Status:</span><span id="status" class="stats-value">${thisRover.status}</span></div>
        <div class="row"><span class="stats-key">Launch Date:</span><span id="launch-date" class="stats-value">${new Date(thisRover.launchDate).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}</span></div>
        <div class="row"><span class="stats-key">Landing Date:</span><span id="landing-date" class="stats-value">${new Date(thisRover.landingDate).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})}</span></div>
        <div class="row"><span class="stats-key">Mission Duration:</span><span id="time-on-mars" class="stats-value">${thisRover.missionDuration}</span></div>
        <div class="row"><span class="stats-key">Total Photos:</span><span id="total-photos" class="stats-value">${thisRover.totalPhotos}</span></div>
        `;
    renderPhotoHeader(thisRover);
}


function getNewDate(earthDate, op) {
    // this changeDate function returns the new date without modifying the original
    const changeDate = (date, op) => {
        if (op === 'subtract') return new Date(date.setDate(date.getDate() - 1));
        else if (op === 'add') return new Date(date.setDate(date.getDate() + 1));
        else return new Date(date);
    };
    const newDate = changeDate(new Date(earthDate), op);
    
    // year, month, day variables make the return statement easier to read.
    const year = newDate.getUTCFullYear();
    const month = (newDate.getUTCMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2});
    const day = newDate.getUTCDate().toLocaleString('en-US', {minimumIntegerDigits: 2});
    return `${year}-${month}-${day}`;
}



function checkDate(maxDate, photoDate) {
    if (maxDate === photoDate) document.querySelector('.forward').classList.add('none-shall-pass');
    else document.querySelector('.forward').classList.remove('none-shall-pass');
}

function addButtonListeners(rover) {  
    Array.from(document.querySelectorAll('.photo-nav')).forEach(x => {
        x.addEventListener('click', () => {
            const thisDate = new Date(document.getElementById('photo-date').innerText);          
            if (x.classList.contains('back')) {
                const newDate = getNewDate(thisDate, 'subtract');
                document.getElementById('photo-date').innerText = newDate;
                checkDate(rover.maxDate, newDate);
                renderPhotos({name: rover.name, photoDate: newDate, maxDate: rover.maxDate});
            } else if (x.classList.contains('forward')) {
                // need to find if current date is the same as actual date
                const newDate = getNewDate(thisDate, 'add');

                if(newDate <= rover.maxDate) {
                    document.getElementById('photo-date').innerText = newDate;
                    checkDate(rover.maxDate, newDate);
                    renderPhotos({name: rover.name, photoDate: newDate, maxDate: rover.maxDate});
                } 
            }
        });      
    });
}

// this function renders the photo header with date, forward, and back buttons.
function renderPhotoHeader(rover) {
    console.log('rendering photo header');
    
    document.getElementById('photos').innerHTML = `
        <div class="row photo-header">
            <div class="photo-nav back">&lt;&lt;</div>
            <p>Earth Date <span id="photo-date">${rover.maxDate}<span></p>
            <div class="photo-nav forward none-shall-pass">&gt;&gt;</div>
        </div>
        <div id="gallery" class="column">
        </div>
        `;
    // add listeners to the forward and back buttons
    addButtonListeners(rover);

    // render photos for the date selected
    renderPhotos({name: rover.name, photoDate: rover.maxDate, maxDate: rover.maxDate});
}

function newEl(element) {
    // shortcut to create new elements (DRY code!)
    return document.createElement(element);
}

function createPhoto(photo) {
    // Define the elements
    const container = newEl('div');
    const photoCaption = newEl('div');
    const hyperlink = newEl('a');
    const image = newEl('img');

    // Set classes
    container.classList.add('rover-photo-container');
    photoCaption.classList.add('rover-photo-caption');
    image.classList.add('rover-photo');

    // Set attributes
    hyperlink.setAttribute('href', photo.img_src);
    hyperlink.setAttribute('target', '_blank');
    image.setAttribute('src', photo.img_src);
    image.setAttribute('alt', `${photo.camera}, ID ${photo.id}`);

    // Set caption text
    photoCaption.innerText = `${photo.camera}, ID ${photo.id}`;

    // Assemble photo HTML structure
    hyperlink.appendChild(image);
    container.appendChild(photoCaption);
    container.appendChild(hyperlink);

    // Return completed photo HTML structure
    return container;
}

function renderPhotos(rover) {
    document.getElementById('gallery').innerHTML = '<img class="loading" src="assets/images/loading.gif" alt="">';
    fetch(`/photos/${rover.name}/${rover.photoDate}`)
        .then(res => res.json())
        .then(photos => {
            const dayPhotos = new DocumentFragment();
            const footer = newEl('footer');
            footer.innerText = `Data sourced from https://www.nasa.gov`;
            document.getElementById('gallery').innerHTML = '';
            photos.forEach((photo, index) => {
                const newPhoto = createPhoto(photo);
                dayPhotos.appendChild(newPhoto);
                if(index != photos.length -1) dayPhotos.appendChild(newEl('hr'));
            });
            document.getElementById('gallery').appendChild(dayPhotos);
            document.getElementById('gallery').appendChild(footer);            
        });
}

const getRoverManifest = (rover, state) => {
    document.getElementById('stats').innerHTML = `<img class="loading" src="assets/images/loading.gif" alt="">`;
    document.getElementById('photos').innerHTML = ``;
    fetch(`/rover/${rover}`)
        .then(res => res.json())
        .then(thisRover => {
            renderStats(thisRover);
        });
};

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    firstLoad(store);
});

function firstLoad(state) {
    fetch(`/rover/${store.rovers[0].toLowerCase()}`)
        .then(res => res.json())
        .then(data => {
            render(root, state, data);           
        });
}

const render = async (root, state, rover) => {
    root.innerHTML = App(state);
    renderStats(rover);
    document.querySelectorAll('.nav-item').forEach(x => {
        x.addEventListener('click', function () {
            document.querySelector('.selected').classList.remove('selected');
            x.classList.add('selected');
            getRoverManifest(x.innerText, store);
        });
    });
};


// Next UP:
// 1. If there are no photos for a date, display something that says so.
