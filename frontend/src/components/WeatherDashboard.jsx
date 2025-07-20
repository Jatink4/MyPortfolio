import React, { useState } from 'react';
import axios from 'axios';

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [unit, setUnit] = useState('metric');
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getCoordinates = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      if (res.data.length === 0) throw new Error('City not found');
      return { lat: res.data[0].lat, lon: res.data[0].lon, name: res.data[0].name, country: res.data[0].country };
    } catch (err) {
      throw new Error('Location not found');
    }
  };

  const fetchWeatherAndForecast = async () => {
    if (!city) return;

    try {
      const { lat, lon, name, country } = await getCoordinates();

      const weatherPromise = axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
      );
      const forecastPromise = axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
      );

      const [weatherRes, forecastRes] = await Promise.all([weatherPromise, forecastPromise]);

      setWeather({ ...weatherRes.data, name, country });
      const daily = forecastRes.data.list.filter((reading) =>
        reading.dt_txt.includes("12:00:00")
      );
      setForecast(daily);
      setError('');
    } catch (err) {
      setError('City not found or API error');
      setWeather(null);
      setForecast([]);
    }
  };

  const getIconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="bg-gray-900 text-white p-6 space-y-6 rounded-xl shadow-xl">
      <h1 className="text-3xl font-bold text-center text-amber-400">🌦️ Live Weather Dashboard</h1>

      <div className="flex justify-center gap-4 flex-wrap">
        <input
          className="p-2 rounded bg-gray-800 text-white border border-gray-700"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white border border-gray-700"
        >
          <option value="metric">°C</option>
          <option value="imperial">°F</option>
        </select>
        <button onClick={fetchWeatherAndForecast} className="bg-blue-600 px-4 py-2 rounded font-semibold hover:bg-blue-500">
          Search
        </button>
      </div>

      {error && <p className="text-red-400 text-center">{error}</p>}

      {weather && (
        <div className="bg-gray-800 p-6 rounded-xl max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">
            {weather.name}, {weather.country}
          </h2>
          <img src={getIconUrl(weather.weather[0].icon)} alt="weather icon" className="mx-auto" />
          <p className="text-xl capitalize">{weather.weather[0].description}</p>
          <p className="text-4xl font-bold">
            {weather.main.temp}°{unit === 'metric' ? 'C' : 'F'}
          </p>
          <p>Feels like: {weather.main.feels_like}°</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
        </div>
      )}

      {forecast.length > 0 && (
        <div className="bg-gray-800 p-6 rounded-xl max-w-4xl mx-auto mt-6">
          <h3 className="text-xl font-semibold text-amber-400 mb-4">5-Day Forecast</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {forecast.map((day, idx) => (
              <div key={idx} className="bg-gray-700 p-4 rounded text-center">
                <p className="font-semibold">{new Date(day.dt_txt).toLocaleDateString()}</p>
                <img src={getIconUrl(day.weather[0].icon)} alt="forecast icon" className="mx-auto" />
                <p className="text-sm capitalize">{day.weather[0].description}</p>
                <p className="text-lg font-bold">{day.main.temp}°</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
