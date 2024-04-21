import { useState, useEffect } from 'react'
import axios from 'axios'

import Country from './components/Country'
import Countries from './components/Countries'

const App = () => {
  const [value, setValue] = useState('')
  const [countryData, setcountryData] = useState([])
  const [search, setcountry] = useState(null)
  const [weather, setWeather] = useState({})
  const WEATHER_URL = import.meta.env.VITE_WEATHER_API_BASE_URL

  useEffect(() => {

    // skip if country is not defined
    if (search !== null) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all/`)
        .then(resp => {
          const countries = resp.data
          const matchCountries = countries.filter(item => item.name.official.toLowerCase().includes(search.toLowerCase()))          
          if (matchCountries.length === 1) {
            getCountryWeather(matchCountries[0])
            setcountryData(matchCountries)
          } else {
            setcountryData(matchCountries)
          }
        })
    }
  }, [search])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setcountry(value)
    setValue('')
  }

  const getCountryWeather = (country) => {
    const WEATHER_API = import.meta.env.VITE_WEATHER_API
    const _weather = {}
    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital}&appid=${WEATHER_API}`)
      .then(resp => {
        const coords = { lat: resp.data[0].lat, lon: resp.data[0].lon }
        axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=hourly,daily&appid=${WEATHER_API}`)
          .then(rep => {
            _weather.temp = parseFloat(rep.data.current.temp) - 273.15
            _weather.wind = `${rep.data.current.wind_speed} m/s`
            _weather.icon = `https://openweathermap.org/img/wn/${rep.data.current.weather[0].icon}.png`
            _weather.icon_description = rep.data.current.weather[0].description
            _weather.capital = country.capital
            setWeather({ ..._weather })
          })
      })
      .catch(e => console.log(e.message))
  }

  const getCountryInfo = (country) => {
    getCountryWeather(country)
    setcountryData([country])
  }

  if (countryData.length === 0 && search) {
    return (
      <>
        <form onSubmit={onSearch}>
          country: <input placeholder='Enter a word' value={value} onChange={handleChange} required />
        </form>
        <p>No countries match your search, please try other words!</p>
      </>
    )
  }
  else if (countryData.length === 1) {
    return (<>
      <form onSubmit={onSearch}>
        country: <input placeholder='Enter a word' value={value} onChange={handleChange} required />
      </form>
      <Country country={countryData[0]} weather={weather} />
    </>)
  } else if (countryData.length <= 10) {
    return (<>
      <form onSubmit={onSearch}>
        country: <input placeholder='Enter a word' value={value} onChange={handleChange} required />
      </form>
      <>
        <Countries match={countryData} searchCountryInfo={getCountryInfo} />
      </>
    </>)
  } else
    return (
      <div>
        <form onSubmit={onSearch}>
          country: <input value={value} onChange={handleChange} required />
        </form>
        <p>Too many results to display, specify another filter !</p>
      </div>
    )
}

export default App