const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Rucha'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        para: 'Welcome to About page!',
        name: 'Rucha'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        para: 'This page is to help you!',
        name: 'Rucha'
    })
})

app.get('/weather', (req, res) =>{

    if(!req.query.address){
         return res.send({
             error: 'You must provide an address!'
         })
    }
    geocode( req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error: 'Cannot connect!'
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
    
            if(error){
                return res.send({
                    error:'Location not found!'
                    })
            }
    
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
          })
    })

})

app.get('/help/*', (req, res) => {
    res.render( '404', {
        title: '404',
        error: 'Help article not found',
        name: 'Rucha'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found',
        name: 'Rucha'

    })
})
app.listen(port, () =>{
    console.log('Server is up on port 3000.')
})