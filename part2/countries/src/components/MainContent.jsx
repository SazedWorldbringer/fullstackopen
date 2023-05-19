import Countries from "./Countries";
import CountryInfo from "./CountryInfo";

const MainContent = ({ countries, handleClick }) => {
  return countries.length == 0 ? (
    null
  ) :
    countries.length > 10 ? (
      <p>Too many matches, specify another filter</p>
    ) : (countries.length <= 10) && (countries.length > 1) ? (
      <Countries countries={countries} handleClick={handleClick} />
    ) : (
      <CountryInfo country={countries[0]} />
    )
}

export default MainContent;
