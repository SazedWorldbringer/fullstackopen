import axios from "axios"
import { useEffect, useState } from "react"

const apiKey = import.meta.env.VITE_WEATHER_KEY

const geolocationUrl = (capital) => {
  return `http://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=1&appid=${apiKey}`
}
const weatherUrl = (latitude, longitude) => {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
}

const CountryInfo = ({ country, loading, handleLoading }) => {
  const [weatherData, setWeatherData] = useState({})

  useEffect(() => {
    axios
      .get(geolocationUrl(country.capital))
      .then(response => {
        const { lat, lon } = response.data[0]
        axios
          .get(weatherUrl(lat, lon))
          .then(response => {
            let weatherData = {
              temp: response.data.main.temp,
              wind: response.data.wind.speed,
              icon: response.data.weather[0].icon
            }
            setWeatherData(weatherData)
          })
      })
  })

  return (
    <div>
      <h2>{country.name.common}</h2>

      <div>

        <div>
          <div>Capital: {country.capital}</div>
          <div>Area: {country.area}</div>
          <h3>Languages:</h3>
          <ul>
            {Object.values(country.languages)
              .map((language, idx) =>
                <li key={idx}>{language}</li>)}
          </ul>
          <img src={country.flags.png} alt={`${country.name.common} flag`} />
        </div>

        <div>
          <h2>Weather in {country.capital}</h2>
          <p>Temperature {Math.round((weatherData.temp) - 273.15)} Celsius</p>
          <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} />
          <p>Wind: {weatherData.wind} m/s</p>
        </div>

      </div>
    </div >
  )
}

export default CountryInfo
