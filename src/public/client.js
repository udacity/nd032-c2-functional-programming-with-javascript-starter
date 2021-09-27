// BEFLORE TODO: You should refactor so you can use this import instead of HTML Script of immutable
// Immutable objects are called ‘maps’
// import { Map } from "immutable";

let store = Immutable.Map({
  user: { name: "Student" },
  apod: "",
  rovers: ["Curiosity", "Opportunity", "Spirit"],
  selectedRover: ""
});

// add our markup to the page
const root = document.getElementById("root");

const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
  render(root, store);
};

const render = async (root, state) => {
  root.innerHTML = App(state);
};

const navMenu = () => {
  const navArray = () => store.get("rovers");

  return navArray()
    .map((element) => {
      return `
        <div class="rover">
          <button type="button" id="${element}" href=${element} onclick="roverButton(${element})">
            <img id='${element}-img'>
              <h2>${element}</h2>
            </img>
          </button>
        </div>
      `;
    })
    .join("");
};

//button
function roverButton(button) {
  const selectedRover = button.id;
  console.log(`Clicked ${selectedRover}`);
  getRoverData(selectedRover, true);
}

// create content
const App = (state) => {
  let { rovers, apod } = state;

  return `
    <header>
      <nav class="rover-nav">
        ${navMenu()}
      </nav>
    </header>
    <main>
      <section>
        <div id="content" style="display:none">
          ${renderData(state)}
          <div id="roverPhotos">
            ${getRoverImage(state)}
          </div>
        </div>
        <p>Here is an example section.</p>
        <p>
          One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
          the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
          This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
          applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
          explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
          but generally help with discoverability of relevant imagery.
        </p>
        ${ImageOfTheDay(apod)}
      </section>
    </main>
    <footer></footer>
    `;
};

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);
});

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information.

const renderData = (state) => {
  if (state.latest_photos && state.latest_photos[0]) {
    const { name, launch_date, landing_date, status } =
      state.latest_photos[0].rover;
    return `
      <h3>Name: ${name}</h3>
      <div>Launching Date: ${launch_date}</div>
      <div>Landing Date: ${landing_date}</div>
      <div>Status: ${status}</div>

    `;
  }

  return `<h1>PLACEHOLDER!</h1>`;
};

//get latest rover image (Higher Order function)
const getRoverImage = (state) => {
  const roverData = () =>
    state.latest_photos ? state.latest_photos[0] : undefined;
  const data = roverData();

  return data
    ? `
    <div id='img-container'>
      <img src="${data.img_src}" id="${data.rover.name}-img"></img>
    </div>
    `
    : "";
};

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {
  // If image does not already exist, or it is not from today -- request it again
  const today = new Date();
  const photodate = new Date(store.get("apod.date"));
  console.log(photodate.getDate(), today.getDate());

  console.log(photodate.getDate() === today.getDate());
  if (!apod || apod.date === today.getDate()) {
    getImageOfTheDay(store);
  }

  // check if the image is actually a video
  if (apod && apod.image) {
    if (apod.image.media_type === "video") {
      return `
        <iframe width="560" height="315" src="${apod.image.url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <p>${apod.image.title}</p>
        <p>${apod.image.explanation}</p>
      `;
    } else {
      return `
        <img src="${apod.image.url}" height="350px" width="100%" />
        <p>${apod.image.explanation}</p>
      `;
    }
  }
};

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
  let { apod } = state;

  fetch(`http://localhost:3000/apod`)
    .then((res) => res.json())
    .then((apod) => updateStore(store, { apod }));
};

const getRoverData = (roverName, show) => {
  fetch(`http://localhost:3000/rover/${roverName}`)
    .then((res) => res.json())
    .then((roverData) => {
      const latest_photos = roverData.latest_photos;
      updateStore(store, { latest_photos });
      render(root, store);
      if (show) {
        document.getElementById("content").style.display = "grid";
      }
    });
};
