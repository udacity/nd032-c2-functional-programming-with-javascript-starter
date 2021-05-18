const API_MARS_ROVER = (rover) =>
  `http://localhost:3000/mars-rover/${rover.toLowerCase()}`;

let store = {
  user: { name: "Student" },
  rovers: ["Curiosity", "Opportunity", "Spirit"],
};

// add our markup to the page
const root = document.getElementById("root");

const updateStore = (store, newState) => {
  store = Object.assign(store, newState);
  render(root, store);
};

const render = async (root, state) => {
  root.innerHTML = App(state);
};

// create content
const App = (state) => {
  let { rovers } = state;

  getRoversInfo(state);

  return `
        <header>Udacity Project: Mars Dashboard</header>
        <main>
        </main>
        <footer>© Young Bae, 2021</footer>
    `;
};

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
  render(root, store);
});

// ------------------------------------------------------  COMPONENTS

// ------------------------------------------------------  API CALLS

// Example API call
const getRoversInfo = async (state) => {
  let { rovers } = state;

  const response = await fetch(API_MARS_ROVER(rovers[0])).then((res) =>
    res.json()
  );

  console.log(response);

  // fetch(API_MARS_ROVER)
  //   .then((res) => res.json())
  //   .then((apod) => updateStore(store, { apod }));
};
