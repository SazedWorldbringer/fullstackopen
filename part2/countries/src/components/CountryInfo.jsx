const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
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
  )
}

export default CountryInfo
