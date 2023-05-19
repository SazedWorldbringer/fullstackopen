import axios from "axios"
import { useEffect, useState } from "react"

function App() {
  const [countries, setCountries] = useState({})
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => {
        setCountries(res.data)
        console.log(countries)
      })
  }, [])

  const handleSearchChange = (event) => {
    let fc = countries.filter(
      country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
    )

    if (event.target.value == "") fc = []

    setFilteredCountries(fc)
  }

  return (
    <div>
      <div>
        find countries <input onChange={handleSearchChange} />
      </div>
      {
        filteredCountries.length == 0 ? (
          null
        ) :
          filteredCountries.length > 10 ? (
            <p>Too many matches, specify another filter</p>
          ) : (filteredCountries.length <= 10) && (filteredCountries.length > 1) ? (
            filteredCountries.map((country, idx) => <li key={idx}>{country.name.common}</li>)
          ) : (
            <div>
              <h2>{filteredCountries[0].name.common}</h2>
              <div>Caplital {filteredCountries[0].capital}</div>
              <div>Area {filteredCountries[0].area}</div>
              <h3>Languages:</h3>
              <ul>
                {Object.values(filteredCountries[0].languages).map((language, idx) => <li key={idx}>{language}</li>)}
              </ul>
              <img src={filteredCountries[0].flags.png} alt={`${filteredCountries[0].name.common} flag`} />
            </div>
          )
      }
    </div>
  )
}

export default App
