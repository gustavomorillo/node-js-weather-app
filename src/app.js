const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Gustavo Morillo'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me ',
    name: 'Gustavo Morillo'
  })
})

app.get('/help', (req,res) => {
  res.render('help', {
    msg: 'Help message, ok',
    title: 'help text',
    name: 'Gustavo Morillo'
  })
})


app.get('/weather', (req, res) => {

  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }
  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

    if(error) {
      return res.send({ error})
    }
    
  forecast(latitude, longitude, (error, forecastData) => {
    if(error) {
      return res.send({ error})
    }

      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
    })
  })
})
})



app.get('/products', (req, res) => {

  if(!req.query.search) {
    return res.send({
      error: 'You must provide a seach term'
    })
  }


  console.log(req.query.search)
  res.send({
    products: []
  })
})


app.get('/help/*', (req, res) => {

  res.render('404', {
    msg: 'Article not found',
    name: 'Gustavo Morillo',
    title: 'sorry'
  })
})
app.get('*', (req, res) => {

  res.render('404', {
    msg: 'Page not found',
    name: 'Gustavo Morillo',
    title: 'Sorry'
  })
})


app.listen(port, () => {

  console.log('Server is up on port ' + port)

})