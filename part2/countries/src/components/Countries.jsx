const Countries = ({ countries }) => (
  <ul>
    {countries
      .map((country, idx) =>
        <li key={idx}>{country.name.common}</li>)}
  </ul>
)

export default Countries;
