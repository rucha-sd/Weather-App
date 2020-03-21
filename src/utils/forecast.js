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
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}
     
module.exports=forecast