'use strict';
const { mapForecastData, mapCurrentData } = require('./utils');
const fetch = require('node-fetch');
const URL_IP_API = process.env.URL_IP_API
const API_WEATHER_KEY = process.env.API_WEATHER_KEY
const URL_OPEN_WEATHER_API = process.env.URL_OPEN_WEATHER_API
let ip_public

module.exports.ip_public = ip_public
module.exports = {
  getDataCity: (ip_public) => (new Promise(function (resolve, reject) {
    (async () => {
      fetch(URL_IP_API + ip_public + "?fields=status,country,countryCode,region,regionName,city,zip,lat,lon,timezone")
        .then(res => res.json())
        .then(body => {

          resolve(body)
        });
    })();
  })),

  getWeatherData: (city, lat, lon) => (
    new Promise(function (resolve, reject) {
      (async () => {
        let query = URL_OPEN_WEATHER_API + "weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + API_WEATHER_KEY
        if (city) {
          query = URL_OPEN_WEATHER_API + "weather?q=" + city.replace(" ", "%20") + "&units=metric&appid=" + API_WEATHER_KEY
        }
        fetch(query)
          .then(res => res.json())
          .then(body => {
            const weather = []
            weather.push(mapCurrentData(body))
            resolve(weather)
          }).catch(error => {
            reject(error)
          })

      })();
    })),

  getForecastData: (city, lat, lon) => (
    new Promise(function (resolve, reject) {
      (async () => {
        let query = URL_OPEN_WEATHER_API + "forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + API_WEATHER_KEY
        if (city) {
          query = URL_OPEN_WEATHER_API + "forecast?q=" + city.replace(" ", "%20") + "&units=metric&appid=" + API_WEATHER_KEY
        }
        fetch(query)
          .then(res => res.json())
          .then(body => {
            if (Object.entries(body).length) {
              const forecast = [];
              for (let i = 0; i < body.list.length; i += 8) {
                forecast.push(mapForecastData(body.list[i + 4]));
              }
              forecast["location"] = body.city
              resolve(forecast);
            }
          }).catch(error => {
            reject(error)
          })
      })();
    })),
}

