const request = require('request')
require('dotenv').config();
const api_mapbox = process.env.API_MAPBOX

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${api_mapbox}`

  request({url, json: true}, (error, { body}) => {
    if (error) {
      callback('Unable to connect to the location services!', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find your location', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
