 function mapForecastData(data) {
    const mapeo = {
        date: data.dt_txt,
        humidity: data.main.humidity,
        icon_id: data.weather[0].id,
        temperature: data.main.temp,
        description: data.weather[0].description,
        wind_speed: Math.round(data.wind.speed * 3.6),
        condition: data.cod
    };
  
    if (data.weather[0].icon) {
      mapeo.icon = data.weather[0].icon;
    }
  
    if (data.main.temp_min && data.main.temp_max) {
      mapeo.temp_max = data.main.temp_max;
      mapeo.temp_min = data.main.temp_min;
    }
    Object.keys(mapeo).forEach(
      key => mapeo[key] === undefined && delete data[key]
    );
  
    return mapeo;
  }
  
function mapCurrentData(data) {
    const mapeo = {
      location: {
        city: data.name,
        coord: data.coord,
        country: data.sys.country,
      },
      weather: data.weather[0]
    };
  
    Object.keys(mapeo).forEach(
      key => mapeo[key] === undefined && delete data[key]
    );
  
    return mapeo;
  }
  module.exports = {
    mapForecastData,
    mapCurrentData
}