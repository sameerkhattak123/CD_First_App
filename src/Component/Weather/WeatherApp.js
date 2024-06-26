import React, { useState } from 'react';
import { Input, Button, Typography, Spin, Alert } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './WeatherApp.css'; // Import CSS for custom styling
import sunIcon from '../../sun.jpg'; // Import sun image
import windIcon from '../../wind.png'; // Import wind PNG

const { Title, Text } = Typography;

const WeatherApp = () => {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const geoapifyApiKey = 'a1775d5e539649d9afda826a4ef544bd';

  const fetchCoordinates = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch coordinates from Geoapify API
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(location)}&apiKey=${geoapifyApiKey}`
      );
      if (!response.ok) {
        throw new Error('Location not found');
      }
      const data = await response.json();

      // Extract coordinates
      const { lat, lon } = data.features[0].properties;
      setCoordinates({ lat, lon });
    //   console.log('coordinates',coordinates);

      // Fetch weather data from Open Meteo API
      await fetchWeatherData(lat, lon);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherData = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
      );
      if (!response.ok) {
        throw new Error('Weather data not available');
      }
      const data = await response.json();
    //   console.log('data',data);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data. Please try again.');
    }
  };

  return (
    <div className="weather-app-container">
      <Title level={2}>Weather App</Title>
      <Input
        placeholder="Enter address or city name"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ marginBottom: 16 }}
        onPressEnter={fetchCoordinates}
        suffix={<SearchOutlined onClick={fetchCoordinates} style={{ cursor: 'pointer' }} />}
      />
      <Button type="primary" onClick={fetchCoordinates} loading={loading}>
        Search
      </Button>

      {loading && <Spin style={{ marginTop: 16 }} />}

      {coordinates && (
        <div className="coordinates-section">
          <Title level={3}>Coordinates for {location}</Title>
          <Text>Latitude: {coordinates.lat}</Text>
          <br />
          <Text>Longitude: {coordinates.lon}</Text>
        </div>
      )}

      {weatherData && (
        <div className="weather-data-section">
          <Title level={3}>Current Weather</Title>
          <div className="weather-details">
            <div className="weather-info">
              
              <br />
              
            <div className="sun-icon">
              {/* Use sunIcon imported from '../../sun.jpg' */}
              <img style={{ width: '70px', height: '70px' }} src={sunIcon} alt="Sun Icon" />
              <Text>Temperature: {weatherData.current.temperature_2m}°C</Text>
            </div>
            <div className="wind-icon">
              {/* Use windIcon imported from '../../wind.png' */}
              <img style={{ width: '50px', height: '30px' }} src={windIcon} alt="Wind Icon" />
              <Text>Wind Speed: {weatherData.current.wind_speed_10m} km/h</Text>
            </div>
            </div>
          </div>
        </div>
      )}

      {error && <Alert message={error} type="error" style={{ marginTop: 16 }} />}
    </div>
  );
};

export default WeatherApp;
