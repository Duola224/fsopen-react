import Weather from "./Weather"
const Country = (props) => {

    return (
      <>
        <h2>Country information</h2>
        <ul>
          <li><span>country: </span>{props.country.name.common}</li>
          <li><span>capital: </span>{props.country.capital[0]}</li>
          <li><span>languages: </span>{Object.values(props.country.languages)[0]}</li>
          <li><span>area: </span>{props.country.area}</li>
          <li><a href={props.country.maps.openStreetMaps} target='_blank'>Go the map</a></li>
          <li><span>flag: </span>{props.country.flag}</li>
          <li><span>region: </span>{props.country.region}</li>
          <img src={props.country.flags.png} alt={props.country.flags.alt} />
        </ul>
        <Weather capital={props.country.capital[0]} temp={props.weather.temp} icon={props.weather.icon} icon_description={props.weather.icon_description} wind={props.weather.wind} />
      </>
    )
  }

  export default Country