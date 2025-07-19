import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [unit, setUnit] = useState('metric');
  const [error, setError] = useState('');

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('City not found');
      setWeather(null);
    }
  };

  const fetchForecast = async () => {
    if (!city) return;
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      const daily = response.data.list.filter(reading => reading.dt_txt.includes("12:00:00"));
      setForecast(daily);
    } catch (err) {
      setForecast([]);
    }
  };

  const handleSearch = () => {
    fetchWeather();
    fetchForecast();
  };

  const getIconUrl = icon => `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-amber-400">🌦️ Live Weather Dashboard</h1>

      <div className="flex justify-center gap-4 flex-wrap">
        <input
          className="p-2 rounded bg-gray-800 text-white border border-gray-700"
          placeholder="Enter city"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <select
          value={unit}
          onChange={e => setUnit(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white border border-gray-700"
        >
          <option value="metric">°C</option>
          <option value="imperial">°F</option>
        </select>
        <button onClick={handleSearch} className="bg-blue-600 px-4 py-2 rounded font-semibold">
          Search
        </button>
      </div>

      {error && <p className="text-red-400 text-center">{error}</p>}

      {weather && (
        <div className="bg-gray-800 p-6 rounded-xl max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">{weather.name}, {weather.sys.country}</h2>
          <img src={getIconUrl(weather.weather[0].icon)} alt="weather icon" className="mx-auto" />
          <p className="text-xl">{weather.weather[0].description}</p>
          <p className="text-4xl font-bold">{weather.main.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
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
                <p className="text-sm">{day.weather[0].main}</p>
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
