const Countries = ({ countries, handleClick }) => (
  <ul>
    {countries
      .map((country, idx) => (
        <li key={idx}>
          <span>{country.name.common}</span>
          <button onClick={() => handleClick(country)}>show</button>
        </li>
      ))}
  </ul>
)

export default Countries;
