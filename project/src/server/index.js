require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.listen(port, () => console.log(`App listening on port ${port}!`))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, '../public')))

app.get('/favicon.ico', (req, res) => {
    res.sendStatus(404);
});

app.get('/rovers/:rover', async (req, res) => {
    console.log("========== DEBUG: Rover API Called ==========")

    const rover = req.params.rover
    const date = req.params.date

    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&api_key=${process.env.API_KEY}`

    try {
        let image = await fetch(url)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})

// NOTE: I can't get the manifest call to work. It returns the proper JSON, 
// but I can't get it to load into the store properly. It's always undefined.
// With more time, I'd call this first to get the basic information, and
// use that to limit the date selection on the frontend.

// app.get('/manifest/:rover', async (req, res) => {
    
//     const rover = req.params.rover
//     const url = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?&api_key=${process.env.API_KEY}`

//     console.log(`=============== DEBUG: manifest URL - ${url}`)

//     try {
//         let manifest = await fetch(url)
//         .then(res => res.json())
//         res.send({ manifest })
//     } catch (err) {
//         console.log('error:', err);
//     }
// })
