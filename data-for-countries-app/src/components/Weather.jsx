const Weather = ({ capital, temp, icon, icon_description, wind }) => {
    return (<>
      <h2>Weather in {capital}</h2>
      <p><span>temperature: </span> {temp}</p>
      <img src={icon} alt={icon_description} />
      <p><span>wind: </span> {wind}</p>
    </>)
  }
  
export default Weather