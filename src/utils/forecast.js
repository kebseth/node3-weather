const request = require('request')
require('dotenv').config();
const api_darksky = process.env.API_DARKSKY

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/${api_darksky}/${latitude},${longitude}`
  request({ url, json:true}, (error, { body }) => {
    if(error) {
      callback('Unable to connect to the location services!', undefined)
    } else if (body.error) {
      callback('Unable to find your location', undefined)
    } else {
      callback(undefined, body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is a " + body.currently.precipProbability + "% chance of rain.")
    }
  })
}

module.exports = forecast
