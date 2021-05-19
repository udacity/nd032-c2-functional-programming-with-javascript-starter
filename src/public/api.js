const API = {
  marsRover: (rover) =>
    `http://localhost:3000/mars-rover/${rover.toLowerCase()}`,
};

const fetchMarsRovers = async (state) =>
  Promise.all(
    state.get("rovers").map(async ({ name }) => {
      const {
        landing_date: landingDate,
        launch_date: launchDate,
        status,
        max_sol: maxSol,
        photos,
      } = await fetch(API.marsRover(name)).then((res) => res.json());

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

export default API;
export { fetchMarsRovers };
