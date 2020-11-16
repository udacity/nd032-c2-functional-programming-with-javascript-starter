let store = Immutable.Map({
    user: Immutable.Map({ name: "Sreejith" }),
    apod: '',
    currentRover: '',
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
    roversData: Immutable.Map({
        Curiosity: '',
        Opportunity: '',
        Spirit: ''
    })
});

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (state, newState) => {
    store = state.merge(newState);
    render(root, store);
}

const render = async (root, state) => {
    root.innerHTML = App(state);
}

// create content
const App = (state) => {

    return `
    <header>
      <ul>
        ${header(state)}
      </ul>
    </header>
        <section class="main">
            <section>
            ${getRoverData(state, state.get("currentRover"))}
            </section>
        </section>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
});

// Utility functions
const getTodaysDate = () => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
}

const itemClicked = (item) => {
    // TODO: getRoverDatafromApi(item);
    // TODO: updateStore(store, { currentRover: item });
};

// ------------------------------------------------------  COMPONENTS

const header = (state) => {
    return state.get("rovers")
        .map((item) => `<li onClick=itemClicked("${item}")>${item}</li>`)
        .reduce((result, rover) => result += rover);
}

const getRoverData = (state, currentRover) => {

    if (!currentRover) {
        return `Select any rover to see the data`;
    } else {
        // if(state.get("roversData").get(currentRover)) {
        //     //TODO: Render UI with existing data
        // } else {
        //     //TODO: fetch data from API and update UI
        // }
    }

    // TODO: switch (currentRover) {

    //     case "Curiosity":
    //         return 'Great you have selected the rover: Curiosity';
    //     case "Opportunity":
    //         return 'Great you have selected the rover: Opportunity';
    //     case "Spirit":
    //         return 'Great you have selected the rover: Spirit';

    // }
}

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {
    // If image does not already exist, or it is not from today -- request it again
    if (!apod || apod.get("image").get("date") != getTodaysDate()) {
        getImageOfTheDay(store);
    }

    if (!apod) return '';
    // check if the photo of the day is actually type video!
    if (apod.get("media_type") === "video") {
        return (`
            <p>See today's featured video <a href="${apod.get("url")}">here</a></p>
            <p>${apod.get("title")}</p>
            <p>${apod.get("explanation")}</p>
        `)
    } else {
        return (`
            <img src="${apod.get("image").get("url")}" height="350px" width="100%" />
            <p>${apod.get("image").get("explanation")}</p>
        `);
    }
}

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {

    fetch(`http://localhost:3000/apod`)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Oops! Something went wrong! Please try again.');
            }
        }).then(apod => {
            if (apod.image.code == 404) {
                throw new Error(apod.image.msg);
            } else {
                updateStore(state, { apod });
            }

        }).catch(error => {
            console.log(error.message);
        });
}

const getRoverDatafromApi = (rover) => {
    let url = new URL("http://localhost:3000/rover");
    url.searchParams("name", rover);

    fetch(url)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Oops! Something went wrong! Please try again.');
            }
        }).then(data => {
            console.log(data);
            // if (apod.image.code == 404) {
            //     throw new Error(apod.image.msg);
            // } else {
            //     updateStore(state, { apod });
            // }

        }).catch(error => {
            console.log(error.message);
        });
}
