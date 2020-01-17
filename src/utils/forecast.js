const request = require('request')


const url = 'https://api.darksky.net/forecast/'+process.env.DARKSKY_KEY+'/37.8267,-122.4233?units=si&lang=hr'


const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/'+process.env.DARKSKY_KEY+'/'+
    latitude + ',' + longitude +
    '?units=si&lang=hr'

request({url, json: true}, (error, {body}) => {


    if(error){
        callback('Unable to connect to weather service!', undefined)
    } else if(body.error) {
        callback('Unable to find location.', undefined)
    } else {
        body.daily.data[0].temperatureLow
        callback(undefined, body.daily.data[0].summary + ' Trenutno je ' + 
        body.currently.temperature + 'C stupnjeva celzijusa. Najviša dnevna temperatura iznosi ' +
        body.daily.data[0].temperatureHigh + 'C a najniža '+
        body.daily.data[0].temperatureLow + 'C. Postoji ' + 
        body.currently.precipProbability + '% šanse za kišu.')
    }
})

}

module.exports = forecast