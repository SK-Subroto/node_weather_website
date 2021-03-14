const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic3Vicm90bzM1IiwiYSI6ImNrbTBxMjJ3ZzI4NnoydXM1YWRxbHVucXgifQ.kk2nkr8Tnn-F1PIjBwIuvQ&limit=1`
    request({url: url, json: true}, (error, {body}) => {
        if(error){
            callback('unable to connect', undefined)
        } else if(body.features.length === 0){
            callback('not found location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode