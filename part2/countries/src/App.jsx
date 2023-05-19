import axios from "axios"
import { useEffect, useState } from "react"
import Filter from "./components/Filter"
import MainContent from "./components/MainContent"

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

  const handleClick = (c) => {
    setFilteredCountries(filteredCountries.filter(country => country.name == c.name))
  }

  return (
    <div>
      <Filter handleChange={handleSearchChange} />
      <MainContent countries={filteredCountries} handleClick={handleClick} />
    </div>
  )
}

export default App
