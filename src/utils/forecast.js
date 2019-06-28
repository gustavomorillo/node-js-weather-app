const request = require('request')

const forecast = (latitude, longitude, callback) => {
  
  const url = 'https://api.darksky.net/forecast/2a06990928e09d3ca5da84512a439aad/'+ latitude + ',' + longitude + '?units=si'
request({url, json:true}, (error, {body}) => {
 
  if(error) {
    callback('Unable to connect to weather service!', undefined)
  } else if (body.error) {
    callback('Unable to find location', undefined)
  } else {
    callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. ' + 'There is ' + body.currently.precipProbability + '% chance of rain. ' + 'Temperature high: ' + body.daily.data[0].temperatureHigh + ' Temperature low: ' + body.daily.data[0].temperatureLow )
  }
})
}
module.exports = forecast









const url = 'https://api.darksky.net/forecast/2a06990928e09d3ca5da84512a439aad/-66.93333,10.5?units=si&lang=es'

// request({ url: url, json: true }, (error, response) => {

//   // if (error) {
//   //   console.log('Unable to connect to weather service!')
//   // } else if (response.body.error){
//   //   console.log('Unable to find location')
//   // } else {  

//   //   console.log(response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degrees out. ' + 'There is ' + response.body.currently.precipIntensity + '% chance of rain')

//   // }} )