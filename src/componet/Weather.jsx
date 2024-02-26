import React, { useState, useEffect } from "react";
import "./Weather.css";
import Clear_png from "../assetes/icons/clear.png";
import Cloud_png from "../assetes/icons/cloud.png";
import Rain_png from "../assetes/icons/rain.png";
import Storm_png from "../assetes/icons/storm.png";
import Snow_png from "../assetes/icons/snow.png";
import Haze_png from "../assetes/icons/haze.png";
import wind_png from "../assetes/icons/winds.png";
import Humidity from "../assetes/icons/humi.png";
import getWeatherIcon from "./Getweather";
import fetchWeather from "./FetchWeather";

const Weather = () => {
  const apikey = "4cdd5dee4b21790322c9993b89fb25d1";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("kolkata");
  const [error, setError] = useState(null);

  const handlechange = (e) => {
    setCity(e.target.value);
  };

  const handlesearch = (e) => {
    e.preventDefault();
    if (!city) {
      setError("😡");
    } else {
      fetchWeather();
      setCity("");
    }
  };

const fetchWeather = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => setWeatherData(data))
    .catch((error) => setError("Error fetching weather data"));
  console.log(city);
}

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="container-main">
      <div className="top-searchbar">
        <input
          type="text"
          placeholder="enter city"
          value={city}
          onChange={handlechange}
        />

        <button onClick={handlesearch}>Search</button>
        {error && <span style={{ backgroundColor: "" }}>{error}</span>}
      </div>

      <div className="weather-conatiner">
        {weatherData && (
          <div className="weatherimg">
            <img
              src={getWeatherIcon(weatherData.weather[0].main)}
              alt="Weather Icon"
            />
          </div>
        )}

        {weatherData && (
          <div className="weathertemp">
            {Math.round(weatherData.main.temp)}°C
          </div>
        )}
        <div className="weatherlocation">
          {weatherData && <p>Place-{weatherData.name}</p>}
        </div>
        <div className="dataweather">
          <div className="element">
            <img src={Humidity} className="icon" />
            <div className="data">
              {weatherData && (
                <div className="humidity-perc">{weatherData.main.humidity}</div>
              )}
              {weatherData && <div className="text">Humidity</div>}
            </div>
          </div>
          <div className="element">
            <img src={wind_png} className="icon" />
            <div className="data">
              {weatherData && (
                <div className="humidity-perc">
                  {weatherData.wind.speed} km/h
                </div>
              )}

              <div className="text">speed</div>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Weather;
