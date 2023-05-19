import Countries from "./Countries";
import CountryInfo from "./CountryInfo";

const MainContent = ({ countries }) => {
  return countries.length == 0 ? (
    null
  ) :
    countries.length > 10 ? (
      <p>Too many matches, specify another filter</p>
    ) : (countries.length <= 10) && (countries.length > 1) ? (
      <Countries countries={countries} />
    ) : (
      <CountryInfo country={countries[0]} />
    )
}

export default MainContent;
