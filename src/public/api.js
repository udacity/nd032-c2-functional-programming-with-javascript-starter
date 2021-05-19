const API = {
  marsRover: (rover) =>
    `http://localhost:3000/mars-rover/${rover.toLowerCase()}`,
};

export default API;
