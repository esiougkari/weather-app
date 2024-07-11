import React from 'react';

const WeatherInfo = ({ weather }) => {
  if (!weather) return null;

  const iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;

  return (
    <div className={`weather-info ${weather.weather[0].main.toLowerCase()}`}>
      <img src={iconUrl} alt="Weather Icon" />
      <h2>{weather.name}</h2>
      <p>{weather.weather[0].description}</p>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
    </div>
  );
};

export default WeatherInfo;
