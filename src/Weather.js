import React, { useState } from 'react';

function App() {
  const key = '886705b4c1182eb1c69f28eb8c520e20';

  const [cityName, setCity] = useState('');
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === 'Enter') {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${key}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setCity('');
        });
    }
  };

  return (
    <div
      className={
        typeof weather.main != 'undefined'
          ? weather.main.temp > 16
            ? 'app warm'
            : 'app cold'
          : 'app'
      }
    >
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Search...'
            onChange={(e) => setCity(e.target.value)}
            value={cityName}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != 'undefined' ? (
          <div>
            <div className='location-box'>
              <div className='location'>
                {weather.name}, {weather.sys.country}
              </div>
            </div>
            <div className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}°c</div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div className='weather-box2'>
            <div className='temp2'>Enter a valid city or country name</div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
