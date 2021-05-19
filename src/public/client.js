const API_MARS_ROVER = (rover) =>
  `http://localhost:3000/mars-rover/${rover.toLowerCase()}`;

let store = Immutable.Map({
  user: { name: "Student" },
  rovers: [{ name: "Curiosity" }, { name: "Opportunity" }, { name: "Spirit" }],
});

// add our markup to the page
const root = document.getElementById("root");

const updateStore = (store, newState) => {
  const nextStore = Immutable.Map(Object.assign(store, newState));

  if (Immutable.is(store, nextStore)) {
    return;
  }

  store = nextStore;

  return render(root, store);
};

const render = async (root, state) => {
  root.innerHTML = await App(state);
};

// create content
const App = async (state) => {
  await getRoversInfo(state);

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
// const RoverInfo = async (rover) => {
//   return `
//   <dl>
//     <dd>name</dd>
//     <dt>${name}</dt>
//     <dd>Launch Date</dd>
//     <dt>${launchDate}</dt>
//     <dd>Landing Date</dd>
//     <dt>${landingDate}</dt>
//     <dd>status</dd>
//     <dt>${status}</dt>
//   </dl>
//   `;
// };

// ------------------------------------------------------  API CALLS

// Example API call
const getRoversInfo = async (state) => {
  const rovers = state.get("rovers");

  const roverInfo = await Promise.all(
    rovers.map(async ({ name }) => {
      const {
        landing_date: landingDate,
        launch_date: launchDate,
        status,
        max_sol: maxSol,
        photos,
      } = await fetch(API_MARS_ROVER(name)).then((res) => res.json());

      const recentPhotos = (photos || []).filter(
        (photo) => photo.sol === maxSol
      );

      return {
        name,
        landingDate,
        launchDate,
        status,
        maxSol,
        recentPhotos,
      };
    })
  );

  return updateStore(store, { rovers: roverInfo });
};
