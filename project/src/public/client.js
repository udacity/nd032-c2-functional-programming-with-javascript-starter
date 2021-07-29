let store = Immutable.Map({    
    currentRover: '',    
    manifest: '',
    latestImg: '',    
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
})

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (newStore, newState) => {    
    store = newStore.merge(Immutable.Map(newState));
    render(root, store)    
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
                ${renderRoverData(store.get("manifest"))}                
            </section>
        </main>
        <footer></footer>
    `;
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  API CALLS

const loadRoverData = (button) => {   
    let roverName = button.innerText.toLowerCase();    
    let { manifest } = store;
    
    let currentRover = roverName;
    updateStore(store, { currentRover })
    let { latestImg } = store;

    fetch(`http://localhost:3000/manifest?roverName=${roverName}`)
        .then(res => res.json())
        .then(manifest => {
            updateStore(store, { manifest });

            const {manifest: {photo_manifest: {max_date}}} = manifest;
            fetch(`http://localhost:3000/latestImg?roverName=${roverName}&maxDate=${max_date}`)
                .then(res => res.json())
                .then(latestImg => updateStore(store, { latestImg }))            
        });
}

const renderRoverData = (manifest) => {
    if (!manifest || manifest === '')
    {
        return `
            <h3>Please select Mars rover</h3>
        `
    } else {
    const roverName = store.get("currentRover");
    const {manifest: {photo_manifest: {launch_date, landing_date, status, max_date}}} = manifest;             

    return `
        <div>
            <p>Rover Name: ${roverName}</p>
            <p>Launch Date: ${launch_date}</p>
            <p>Landing Date: ${landing_date}</p>
            <p>Status: ${status}</p>
            <p>Date Of Most Recent Photos Were Taken: ${max_date}</p>
        </div>   
        ${getLatestPhotos(store.get("latestImg"))}       
        `
    }        
}

const getLatestPhotos = (latestImg) => {
    if (!latestImg || latestImg === '') {
        return `
            <h4>Loading rover photos...</h4>
        `
    } else {
        const {latestImg: {photos}} = latestImg;
        const images = photos.map(({ img_src }, index, array) => {                        
            return `
                <img src="${ img_src }" height="150px" width="150px">
            `
        });  
        const imageContainer = `<div>${ images }</div>`;
        return imageContainer;      
    }
}


