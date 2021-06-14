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

app.get('/rover/:name', async (req, res) => {
    const rover = req.params.name;
    try {
        let curiosity = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}/?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
            .then(data => {               
                const r = data.photo_manifest;
                const rover = {};
                rover.name = r.name;
                rover.launchDate = r.launch_date;
                rover.landingDate = r.landing_date;
                rover.status = r.status;
                rover.maxDate = r.max_date;
                rover.missionDuration = `${daysBetween(new Date(r.landing_date), new Date(r.max_date))} days`;
                rover.recentPhotos = r.photos[r.photos.length - 1];
                rover.totalPhotos = Number(r.total_photos).toLocaleString('en-US');
                res.send(rover);
            });
    } catch (err) {
        console.log('error:', err);
    }
});

app.get('/photos/:name/:date', async (req, res) => {
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${req.params.name}/photos?earth_date=${req.params.date}&api_key=w6XsOPxbyoqvmDAiYnaaImupw6igfShp3E0XS7wC`)
        .then(res => res.json())
        .then(data => {
            res.send(data);
        });
    
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

