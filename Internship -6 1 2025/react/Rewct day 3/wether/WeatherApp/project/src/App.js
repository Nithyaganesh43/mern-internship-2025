import React, { useState } from 'react';
import axios from 'axios';
import { FaTint, FaWind, FaTachometerAlt } from 'react-icons/fa';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherDetails, setWeatherDetails] = useState(null);

  const fetchWeatherData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;
    try {
      const response = await axios.get(url);
      setWeatherDetails(response.data);
    } catch (err) {
      alert('Error fetching data. Please check the city name!');
      setWeatherDetails(null);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Weather Dashboard</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeatherData}>Find Weather</button>
        </div>
        {weatherDetails && (
          <div className="weather-info">
            <div className="location">
              {weatherDetails.name}, {weatherDetails.sys.country}
            </div>

            <div className="temperature">
              {Math.round(weatherDetails.main.temp)}°F
            </div>
            <div className="description">
              {weatherDetails.weather[0].description.toUpperCase()}
            </div>
            <div className="details">
              <div className="card">
                <FaTint /> Humidity: {weatherDetails.main.humidity}%
              </div>
              <div className="card">
                <FaWind /> Wind Speed: {weatherDetails.wind.speed} mph
              </div>
              <div className="card">
                Feels Like: {Math.round(weatherDetails.main.feels_like)}°F
              </div>
              <div className="card">
                <FaTachometerAlt /> Pressure: {weatherDetails.main.pressure} hPa
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
