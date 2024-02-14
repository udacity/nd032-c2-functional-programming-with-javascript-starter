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

// your API calls

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

/*
Example Api calls from documentation

https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY

https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=DEMO_KEY

https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=DEMO_KEY 

*/


// mars rover API call
app.get('/mars-photos', async (req, res) => {
    try {
        const { rover } = req.query;
        // only page=1 is trigger for fetching photos 
        let image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=${process.env.API_KEY}`)
            .then(res => res.json())

        res.send(image.latest_photos)
    } catch (err) {
        console.log('error:', err);
    }
})


// mars rover API call
app.get('/mission-manifest', async (req, res) => {
    try {
        const { rover } = req.query;
        let image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send( image.photo_manifest )
    } catch (err) {
        console.log('error:', err);
    }
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))


