const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/23cb0544e01014d6cc1f4c309474cebc/' + latitude + ',' + longitude +'?units=si'
    request ( { url , json: true } ,(error, {body}) => {
        if (error)
        {
            callback( 'Unable to connect to location services!' , undefined)
        } else if( body.error){
            callback( 'Unable to find location' , undefined)
        } else {
            const summary = body.daily.data[0].summary
            const temp = body.currently.temperature
            const precip = body.currently.precipProbability
            const minTemp = body.daily.data[0].temperatureLow
            const maxTemp = body.daily.data[0].temperatureHigh
            const forecastData = summary + ' It is currently ' + temp + ' degress out. There is a ' + precip + '% chance of rain.' + 'The minimum temperature for the day is ' + minTemp + ' and the maximum temperature for the day is '+ maxTemp +'.'
            callback(undefined, forecastData )
        }
    })
}
     
module.exports=forecast