const fdk=require('@fnproject/fdk');
const axios = require('axios');

fdk.handle(function(input, ctx) {
  let url = 'http://api.openweathermap.org/data/2.5/weather?appid=[YOUR_API_KEY]&q=Stockholm'
  var codeCardData = getWeather(url)
  return codeCardData
})

const getWeather = async url => {
  try {
    const response = await axios.get(url)
    let jsonData = response.data

    let mainTempCelsius = Math.round(jsonData.main.temp - 273.15)
    let tempMinCelsius = Math.round(jsonData.main.temp_min - 273.15)
    let tempMaxCelsius = Math.round(jsonData.main.temp_max - 273.15)   
    let sunriseTime = new Date(jsonData.sys.sunrise * 1e3).toISOString().slice(11, 16);
    let sunsetTime = new Date(jsonData.sys.sunset * 1e3).toISOString().slice(11, 16);
 
    var codeCardJson = {
      template: 'template1',
      title: jsonData.name,
      subtitle: `${mainTempCelsius}, min ${tempMinCelsius}, max ${tempMaxCelsius}`,
      bodytext:  `${jsonData.weather[0].description[0].toUpperCase() +
      jsonData.weather[0].description.substring(1)}
Sun rises: ${sunriseTime}
Sun sets:  ${sunsetTime}`,
      icon: jsonData.weather[0].icon,
      backgroundColor: 'white'
    }
    return codeCardJson
  } catch (error) {
    console.log('ERROR:',error)
    return null
  }
};
