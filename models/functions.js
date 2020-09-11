'use strict';
const publicIp = require('public-ip');
const fetch = require('node-fetch');
let url_ip_api = 'http://ip-api.com/json/'

const {api_key} = require('../keys.js');


let url_api_open_weather  = "https://api.openweathermap.org/data/2.5/"
let ip_public


module.exports.ip_public = ip_public
module.exports = {
  

     getDataCity:(ip_public)=>( new Promise( function(resolve,reject){

      (async () => {    
        fetch( url_ip_api+ ip_public + "?fields=status,country,countryCode,region,regionName,city,zip,lat,lon,timezone")
        .then(res => res.json())
        .then(body => {
    
          resolve(body) });
   
    })();
    

})),

 getWeatherData: (city)=> (
   
 new Promise( function(resolve,reject){
  (async () => {
    let url_query = url_api_open_weather +"find?q="+city+"&units=metric&appid=" +api_key
    // console.log(url_query)
    fetch( url_query)
    .then(res => res.json())
    .then(body => {
      const weather=[]
      weather.push(mapCurrentData(body))
      // console.log(weather)

      resolve(weather) });
})();


})),

getForecastData: (city)=> (
   
  new Promise( function(resolve,reject){
   (async () => {
     let url_query = url_api_open_weather +"forecast?q="+city+"&units=metric&appid=" +api_key
     fetch( url_query)
     .then(res => res.json())
     .then(body => {
      if (Object.entries(body).length) {
        const forecast = [];
        for (let i = 0; i < body.list.length; i += 8) {
          forecast.push(mapForecastData(body.list[i + 4],body.city));
        }
        resolve(forecast);
      }});
 })();
 
 
 })),
 setIp:(ip)=>{
  (async()=>{
  
    return ip_public = ip
  })
 },
 getIp:()=>{
  (async()=>{
  
    return 
  })
 }

 



}

function mapForecastData(data,cityData) {
  const mapeo = {
    locationData: cityData,
    forecastData:{
    date: data.dt * 1000,
    humidity: data.main.humidity,
    icon_id: data.weather[0].id,
    temperature: data.main.temp,
    description: data.weather[0].description,
    wind_speed: Math.round(data.wind.speed * 3.6), 
    condition: data.cod}
  };


  if (data.dt_txt) {
    mapeo.dt_txt = data.dt_txt;
  }

  if (data.weather[0].icon) {
    mapeo.icon = data.weather[0].icon;
  }

  if (data.main.temp_min && data.main.temp_max) {
    mapeo.max = data.main.temp_max;
    mapeo.min = data.main.temp_min;
  }
  Object.keys(mapeo).forEach(
    key => mapeo[key] === undefined && delete data[key]
  );

  return mapeo;
  }

  function mapCurrentData(data) {
    const mapeo = {
      locationData: {
        city: data.list[0].name,
        coord:data.list[0].coord,
        country: data.list[0].sys.country,
      },
      weatherData:data

    };
  

    Object.keys(mapeo).forEach(
      key => mapeo[key] === undefined && delete data[key]
    );
  
    return mapeo;
    }

 

