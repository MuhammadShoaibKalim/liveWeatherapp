import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';


function App() {
  const [data, setData] = useState({});
  const [city, setCity] = useState('');

  const apiKey = "64db1ac4062fe18f41013578af9382a1";

  const getWeather = () => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    axios.get(apiUrl)
      .then((response) => {
        const weatherData = response.data;
        // Update the data state with the received weather information
        setData(weatherData);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const convertKelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  }

  return (
    <div className='col-md-12'>
      <div className='weatherBg'>
        <h1 className='heading'>Welcome To Weather Application</h1>
        <div className='d-grid gap-3 col-4 mt-4'>
          <input
            type='text'
            className='form-control'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className='btn btn-primary' type='button' onClick={getWeather}>
            Search
          </button>
        </div>
      </div>
      <div className='col-md-12 text-center mt-5'>
        <div className='shadow rounded weatherResult'>
          <img
            src="https://previews.123rf.com/images/jarin13/jarin131406/jarin13140600208/29595940-blue-yellow-and-white-weather-web-or-phone-app-icon-with-cloud-and-sun.jpg"
            className='icon'
            alt='icon'
          />
          <h5 className='weatherCity'>
            {data.name || 'City Name'}
          </h5>
          <h6 className='weatherTemp'>
            {data.main && data.main.temp
              ? `${convertKelvinToCelsius(data.main.temp)}°C`
              : 'Temperature'}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default App;

