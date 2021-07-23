require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')
const { runInNewContext } = require('vm')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// example API call
app.get('/apod', async (req, res) => {
    try {
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})

// your API calls

app.get('/manifest', async (req, res) => {
    try {
        console.log('@@@', req.query, req.params);
        let roverName = req.query.roverName.toLowerCase();
        let manifest = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${roverName}?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ manifest })        
    } catch (err) {
        console.log('manifest loading error:', err);
    }
})

app.get('/latestImg', async (req, res) => {
    try {
        let roverName = req.query.roverName.toLowerCase();
        let latestImg = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?earth_date=2010-03-21&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send ({ latestImg })        
    } catch (err) {
        console.log('images loading error:', err);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))