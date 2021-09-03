require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000
const nasaApiBaseUrl = `https://api.nasa.gov`;
const manifestsUri = `/mars-photos/api/v1/manifests/`;
const roverPhotosUri = `/mars-photos/api/v1/rovers/`;
const photo_count = 15;


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// your API calls


app.get('/manifests/:rover_name', async (req, res) => {
    try {
        let mars_rover = await fetch(`${nasaApiBaseUrl}${manifestsUri}${req.params.rover_name}?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
            .then(data => data['photo_manifest']);
        res.send({mars_rover});
    }
    catch (err) {
        console.error("error: ", err);
    }
})

app.get('/photos/:rover_name/', async (req, res) => {
    try {
        const endpoint = `${nasaApiBaseUrl}${roverPhotosUri}${req.params.rover_name}/photos?sol=1000&api_key=${process.env.API_KEY}&page=1`;
        let photos = await fetch(endpoint)
                .then(res => res.json())
                .then(data => data.photos.map(photo => {
                    return {
                        image: photo.img_src,
                        camera: photo.camera.full_name,
                        photo_date: photo.earth_date ?? 'Date unavailable'
                    }
                }))
                .then(photos => photos.length > photo_count ? photos.slice(0, photo_count+1) : photos)
        res.send(photos)
    }
    catch(err) {
        console.error("error: ", err);
    }
})

app.get('/apod', async (req, res) => {
    try {
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))