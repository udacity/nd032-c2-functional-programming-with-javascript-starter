import store from "./store.js";
import { fetchMarsRovers } from "./api.js";

import Rovers from "./components/Rovers.js";

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

const App = async (state) => {
  const roversData = await fetchMarsRovers(store);

  updateStore(store, { rovers: roversData });

  return `
        <header>Udacity Project: Mars Dashboard</header>
        <main>
          ${Rovers(state)}
        </main>
        <footer>© Young Bae, 2021</footer>
    `;
};

window.addEventListener("load", () => render(root, store));
