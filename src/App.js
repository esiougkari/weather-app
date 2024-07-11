import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    try {
      const apiKey = '60be3ece0e4155f93b5c55dfe3df15c9'; // Replace with your actual OpenWeatherMap API key

      // Fetch current weather
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const currentResponse = await fetch(currentUrl);
      if (!currentResponse.ok) {
        throw new Error(`Failed to fetch current weather data: ${currentResponse.status} ${currentResponse.statusText}`);
      }
      const currentData = await currentResponse.json();

      // Fetch forecast weather
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
      const forecastResponse = await fetch(forecastUrl);
      if (!forecastResponse.ok) {
        throw new Error(`Failed to fetch forecast data: ${forecastResponse.status} ${forecastResponse.statusText}`);
      }
      const forecastData = await forecastResponse.json();

      // Filter to get midday forecasts for the next 5 days (assuming the API returns data every 3 hours)
      const filteredForecast = forecastData.list
        .filter(entry => entry.dt_txt.includes('12:00:00'))
        .slice(0, 5)
        .map(entry => ({
          timestamp: entry.dt,
          icon: entry.weather[0].icon,
          temp: entry.main.temp // Ensure temp property is included
        }));

      setWeather({
        ...currentData,
        days: [
          { timestamp: currentData.dt, icon: currentData.weather[0].icon, temp: currentData.main.temp },
          ...filteredForecast
        ]
      });
      setError(null);

    } catch (error) {
      console.error('Error fetching weather:', error);
      setWeather(null);
      setError('Failed to fetch weather data. Please try again.');
    }
  };

  useEffect(() => {
    // Fetch default weather data on initial load (e.g., for default city)
    fetchWeather('Thessaloniki');
  }, []); // Empty dependency array to run once on component mount

  return (
    <div className="app">
      <div className="search-bar">
        <SearchBar onSearch={fetchWeather} />
      </div>
      {error && <p className="error">{error}</p>}
      <div className="weather-cards">
        {weather && <WeatherCard weather={weather} />}
      </div>
    </div>
  );
};

export default App;
