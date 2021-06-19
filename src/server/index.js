// jshint esversion: 8

const dotenv = require('dotenv').config();
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
function Rover(rover) {
    this.name = rover.name;
    this.launchDate = rover.launch_date;
    this.landingDate = rover.landing_date;
    this.status = rover.status;
    this.maxDate = rover.max_date;
    this.missionDuration = `${daysBetween(new Date(rover.landing_date), new Date(rover.max_date))} days`;
    // this.recentPhotos = rover.photos[rover.photos.length - 1];
    this.totalPhotos = Number(rover.total_photos).toLocaleString('en-US');
}

app.get('/rover/:name', async (req, res) => {
    try {
        await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${req.params.name}/?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
            .then(data => res.send(new Rover(data.photo_manifest)));
    } catch (err) {
        console.log('error: ', err);
    }
});

app.get('/photos/:name/:date', async (req, res) => {
    try {
        await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${req.params.name}/photos?earth_date=${req.params.date}&api_key=w6XsOPxbyoqvmDAiYnaaImupw6igfShp3E0XS7wC`)
            .then(res => res.json())
            .then(data => res.send(data.photos.map(photo => ({id: photo.id, camera: photo.camera.name, img_src: photo.img_src, photo_date: photo.earth_date}))));
    } catch (err) {
        console.log('error: ', err);
    }   
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
