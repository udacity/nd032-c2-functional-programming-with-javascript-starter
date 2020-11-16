let store = Immutable.Map({
    user: Immutable.Map({ name: "Sreejith" }),
    apod: '',
    currentRover: '',
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
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
            ${getRoverData(state.get("currentRover"))}
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
    updateStore(store, { currentRover: item });
};

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

const header = (state) => {
    return state.get("rovers")
        .map((item) => `<li onClick=itemClicked("${item}")>${item}</li>`)
        .reduce((result, rover) => result += rover);
}

const getRoverData = (currentRover) => {
    switch (currentRover) {
        case "":
            return `Select any rover to see the data`;
        case "Curiosity":
            return 'Great you have selected the rover: Curiosity';
        case "Opportunity":
            return 'Great you have selected the rover: Opportunity';
        case "Spirit":
            return 'Great you have selected the rover: Spirit';

    }
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
