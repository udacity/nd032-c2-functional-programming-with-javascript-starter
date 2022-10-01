require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, '../public')))

app.get('/apod', async (req, res) => {
    try {
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then((response) => response.json())
        res.send({ image })
    } catch (error) {
        console.log('error:', err)
    }
})

app.get('/:rover', async (req, res) => {
    const rover = req.params.rover
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=2015-6-3&api_key=${process.env.API_KEY}`

    try {
        let image = await fetch(url)
            .then(res => res.json())
        res.send({ image })
    } catch (err) {
        console.log('error:', err);
    }
})
