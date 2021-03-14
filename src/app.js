const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { query } = require('express')

//import 
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Default paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {

    const context = {
        'title': "Weather",
        'name': 'subroto karmokar'
    }
    res.render('index', context)
})

app.get('/help', (req, res) => {

    const context = {
        'title': "Help",
        'name': 'subroto karmokar'
    }
    res.render('help', context)
})

app.get('/about', (req, res) => {
    const context = {
        'title': "About",
        'name': 'subroto karmokar'
    }
    res.render('about', context)
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location}={}) => {
        if(error){
            console.log('Error: ', error)
            return res.send({
                error:  error
            })
        }
    
        forecast(latitude, longitude, (error, {description, icon, temperature, feelslike}={}) => {
            if(error){
                return console.log('Error: ', error)
            }
            // console.log(latitude +' '+ longitude) 
            // console.log(location)
            // console.log(forecastData)
            res.send({
                location,
                description,
                icon,
                temperature,
                feelslike,
                address: req.query.address
            })
            
        })
    })
})

app.get('/help/*', (req, res) => {
    const context = {
        'title': "404",
        'name': 'subroto karmokar',
        'mgs': 'help article not found'
    }
    res.render('404', context)
})

app.get('*', (req, res) => {
    const context = {
        'title': "404",
        'name': 'subroto karmokar',
        'mgs': 'page not found'
    }
    res.render('404', context)
})

app.listen(3000, () => {
    console.log('Server is running at port 3000...')
})