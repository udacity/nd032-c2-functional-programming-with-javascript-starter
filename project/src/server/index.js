require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

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

app.get('/apod', async (req, res) => {
    try {
        let manifests = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/Curiosity?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({ manifests })        
    } catch (err) {
        console.log('manifest loading error:', err);
    }
})

app.get('/apod', async (req, res) => {
    try {
        let images = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send ({ images })        
    } catch (err) {
        console.log('images loading error:', err);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))