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

app.get('/:rover/:date', async (req, res) => {
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
