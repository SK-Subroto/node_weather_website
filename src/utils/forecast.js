const request = require("request")


const forecast = (longitude, latitude, callback) => {
    url = `http://api.weatherstack.com/current?access_key=922dd692bd865ea95e8c9f3c010eac8b&query=${decodeURIComponent(longitude)},${decodeURIComponent(latitude)}`

    request({url: url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to the weather app', undefined)
        } else if(body.error){
            callback('Please specify a valid location', undefined)
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                icon: body.current.weather_icons[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike

            }
                // `${body.current.weather_descriptions[0]}, Temperature is ${body.current.temperature}° celcius, it's feels like ${body.current.feelslike}° celcius`
                )
        }
    })
}

module.exports = forecast