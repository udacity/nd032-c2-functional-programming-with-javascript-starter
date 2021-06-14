// jshint esversion: 8

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../public')));

// example API call
app.get('/apod', async (req, res) => {
    try {
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then(res => res.json());
        res.send({
            image
        });
    } catch (err) {
        console.log('error:', err);
    }
});

function daysBetween(start, end) {
    return Number(((end - start) / (24 * 60 * 60 * 1000)).toFixed(0)).toLocaleString('en-US');
}

// Rover constructor function
function Rover(data) {
    const r = data.photo_manifest;
    this.name = r.name;
    this.name = r.name;
    this.launchDate = r.launch_date;
    this.landingDate = r.landing_date;
    this.status = r.status;
    this.maxDate = r.max_date;
    this.missionDuration = `${daysBetween(new Date(r.landing_date), new Date(r.max_date))} days`;
    this.recentPhotos = r.photos[r.photos.length - 1];
    this.totalPhotos = Number(r.total_photos).toLocaleString('en-US');
}

app.get('/rover/:name', async (req, res) => {
    const rover = req.params.name;
    try {
        let curiosity = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}/?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
            .then(data => {
                const thisRover = new Rover(data);
                res.send(thisRover);
            });
    } catch (err) {
        console.log('error:', err);
    }
});

app.get('/photos/:name/:date', async (req, res) => {
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${req.params.name}/photos?earth_date=${req.params.date}&api_key=w6XsOPxbyoqvmDAiYnaaImupw6igfShp3E0XS7wC`)
        .then(res => res.json())
        .then(data => {
            const thesePhotos = data.photos.map(x => ({id: x.id, camera: x.camera.name, img_src: x.img_src}));
            console.log(thesePhotos);
            res.send(data);
        });
    
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function Photo(data) {
    this.camera = data.camera.name;
    this.id = data.id;
    this.img_src = data.img_src;
}
