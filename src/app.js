const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

console.log()

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

//setting partials in hbs
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Ovo radi',
        name: 'Jozo Kukavica'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'O meni',
        name: 'Jozo Kukavica'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Naslov help',
        helpText: 'Ovo je text',
        name: 'Jozo Kukavica'
    })
})



// app.get('/help', (req, res) => {
//     res.send([
//         {
//             name: 'Andrew',
//             age: 27
//         },
//         {
//             name: 'Sarah',
//             age: 25
//         }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {

    if(!req.query.adress) {
        return  res.send({
              error: 'You must provide an adress term.'
          })
      } 


      geocode(req.query.adress, (error, {latitude, longitude, location}={} ) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                adress: req.query.adress,
            })
        })


      })


    //   res.send({
    //       weather: [req.query.adress],
    //   })
})



app.get('/products', (req, res) => {
    
    if(!req.query.search) {
      return  res.send({
            error: 'You must provide a search term.'
        })
    } 
    res.send({
        products: [],
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: '- Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
    title: '404',
    name: 'Jozo Kukavica',
    message: '- Page not found.'
    })
})



app.listen(port, () => {
    console.log('Server is on port' + port)
})