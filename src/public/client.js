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
  getRoverData(selectedRover, true);
}

// create content
const App = (state) => {
  let { apod } = state;

  return `
    <header>
      <nav class="rover-nav">
        ${navMenu()}
      </nav>
    </header>
    <section>
      <div id="content" class="content-display-hidden">
        ${renderData(state)}
        <div id="rover-photos">
          ${getRoverImages(state)}
        </div>
      </div>
      <div class="image-of-the-day">
        <h2>Image of the Day:</h2>
        ${ImageOfTheDay(apod)}
      </div>
    </section>
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
      <h3>Rover Name: ${name}</h3>
      <div>Launching Date: ${launch_date}</div>
      <div>Landing Date: ${landing_date}</div>
      <div>Status: ${status}</div>
    `;
  }
  return ``;
};

//get latest rover images (Higher Order function)
const getRoverImages = (state) => {
  const roverData = () =>
    state.latest_photos ? state.latest_photos : undefined;
  let data = roverData();

  if (data) {
    if (data.length >= 4) {
      data = data.splice(0, 4);
    }

    return data
      .map((element) => {
        return `
          <div class='rover-img-container'>
            <img src="${element.img_src}" id="${element.rover.name}-img" class="rover-img-content"></img>
          </div>
        `;
      })
      .join("");
  }
};

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {
  // If image does not already exist, or it is not from today -- request it again
  const today = new Date();
  if (!apod || apod.date === today.getDate()) {
    getImageOfTheDay(store);
  }

  // check if the image is actually a video
  if (apod && apod.image) {
    if (apod.image.media_type === "video") {
      return `
      <div class="rover-media">
        <iframe width="560" height="315" src="${apod.image.url}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <div class="rover-media">
          <p>${apod.image.title}</p>
          <p>${apod.image.explanation}</p>
        </div>
      </div>
      `;
    } else {
      return `
      <div class="rover-media">
        <img src="${apod.image.url}" height="500px" width="500px" />
        <div class="rover-media">
          <p>${apod.image.explanation}</p>
        </div>
      </div>
      `;
    }
  } else {
    return "";
  }
};

// ------------------------------------------------------  API CALLS
const getImageOfTheDay = () => {
  fetch(`http://localhost:3000/apod`)
    .then((res) => res.json())
    .then((apod) => updateStore(store, { apod }));
};

const getRoverData = (roverName, display) => {
  fetch(`http://localhost:3000/rover/${roverName}`)
    .then((res) => res.json())
    .then((roverData) => {
      const latest_photos = roverData.latest_photos;
      updateStore(store, { latest_photos });
      if (display) {
        document.getElementById("content").className = "content-display";
      }
    });
};
