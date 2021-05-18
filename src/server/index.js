require("dotenv").config();

const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

const app = express();
const port = 3000;

const apiKey = process.env.API_KEY;

const liveReloadServer = livereload.createServer();

app.use(connectLivereload());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "../public")));

liveReloadServer.watch(path.join(__dirname, "../public"));
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// your API calls
app.get("/mars-rover", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`
    ).then((res) => res.json());

    res.send(response);
  } catch (err) {
    console.log("error: ", err);
  }
});

// example API call
app.get("/apod", async (req, res) => {
  try {
    let image = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
    ).then((res) => res.json());

    res.send({ image });
  } catch (err) {
    console.log("error:", err);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
