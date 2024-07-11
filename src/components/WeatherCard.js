import React from 'react';

const WeatherCard = ({ weather }) => {
  const iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="weather-card">
      <div className="weather-card-header">
        <h2 className="weather-card-title">{weather.name}</h2>
        <img src={iconUrl} alt="Weather Icon" className="weather-card-icon" />
      </div>
      <div className="weather-card-main">
        <p className="weather-card-temp">{weather.main.temp}°C</p>
        <p className="weather-card-description">{weather.weather[0].description}</p>
      </div>
      <div className="weather-card-footer">
        <div className="weather-days">
          {weather.days.map((day, index) => (
            <div key={index} className="weather-day">
              <p>{formatDate(day.timestamp)}</p>
              <img src={`http://openweathermap.org/img/wn/${day.icon}.png`} alt="Weather Icon" />
              <p>{Math.round(day.temp)}°C</p> {/* Display temperature for each day */}
            </div>
          ))}
        </div>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind Speed: {weather.wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherCard;
