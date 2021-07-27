//const { load } = require("dotenv");

let store = Immutable.Map({
    user: { name: "Student" },
    currentRover: '',
    apod: '',
    manifest: '',
    latestImg: '',
    maxDate: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
})

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (newStore, newState) => {    
    store = newStore.merge(Immutable.Map(newState));
    render(root, store)
    console.log(`updated ${store}`)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}


// create content
const App = (state) => {
    let { rovers, apod } = state;
    
    return `
        <header></header>
        <main>            
            <section>
                <h2>NASA Mars rovers</h2>
                <div>
                    <button type="button" onClick=loadRoverData(this)>${store.getIn(['rovers'])[0]}</button>
                    <button type="button" onClick=loadRoverData(this)>${store.getIn(['rovers'])[1]}</button>
                    <button type="button" onClick=loadRoverData(this)>${store.getIn(['rovers'])[2]}</button>
                </div>
                <header>${renderRoverData(state.get("manifest"))}</header>
                <p>Here is an example section.</p>
                <p>
                    One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                    the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                    This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                    applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                    explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                    but generally help with discoverability of relevant imagery.
                </p>        
                ${ImageOfTheDay(state.get("apod"))}   
            </section>
        </main>
        <footer></footer>
    `;
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {    
    // If image does not already exist, or it is not from today -- request it again
    const today = new Date();
    if (!apod || apod === '') {
        getImageOfTheDay(store);
    } else {
        const photodate = new Date(apod.date);
        //console.log(photodate.getDate(), today.getDate());

        //console.log(photodate.getDate() === today.getDate());
        // check if the photo of the day is actually type video!
        if (apod.image.media_type === "video") {
            return (`
                <p>See today's featured video <a href="${apod.image.url}">here</a></p>
                <p>${apod.image.title}</p>
                <p>${apod.image.explanation}</p>
            `)
        } else {
            return (`
                <img src="${apod.image.url}" height="350px" width="100%" />
                <p>${apod.image.explanation}</p>
            `)
        }
    }    
}

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
    let { apod } = state;
    
    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))
                
    return apod;
}

const loadRoverData = (button) => {
    console.log('button clicked');
    let roverName = button.innerText.toLowerCase();
    console.log(roverName);    
    let { manifest } = store;
    
    let currentRover = roverName;     
    updateStore(store, { currentRover })
    let { latestImg } = store;

    fetch(`http://localhost:3000/manifest?roverName=${roverName}`)
        .then(res => res.json())
        .then(manifest => {
            updateStore(store, { manifest });
            //const manifest2 = store.get('manifest');
            const {manifest: {photo_manifest: {max_date}}} = manifest;         
            fetch(`http://localhost:3000/latestImg?roverName=${roverName}&maxDate=${max_date}`)
                .then(res => res.json())
                .then(latestImg => updateStore(store, { latestImg }))                
        });    
    
    console.log('loadRoverData function');
    //console.log(`maxDate is ${maxDate}`);

    

    console.log(`@@@ ${store}`)    
}


const renderRoverData = (manifest) => {
    if(!manifest || manifest === ''){
        //loadRoverData(store);
    } else {
        const roverName = store.get("currentRover");
        const launchDate = store.get("manifest.photo_manifest.launch_date");
        const landingDate = store.get("manifest.photo_manifest.landing_date");
        const status = store.get("manifest.photo_manifest.status");
        const maxDate = store.get("manifest.photo_manifest.max_date");

        return `
            <p>Rover Name: ${roverName}</p>
            <p>Launch Date: ${launchDate}</p>
            <p>Landing Date: ${landingDate}</p>
            <p>Status: ${status}</p>
            <p>Date Of Most Recent Photos Were Taken: ${maxDate}</p>
        ` 

        /*return `
            <h1>Welcome, ${name}!</h1>
        `*/
    }
}


