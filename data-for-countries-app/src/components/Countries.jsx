const Countries = (props) => {
    const countries = [...props.match]
    return (
      <>
        <h2>Countries ...</h2>
        <ul>
          {countries.map(item => <li key={item.name.common}>{item.name.official} <button onClick={() => props.searchCountryInfo(item)}>show</button> </li>)}
        </ul>
      </>
    )
  }

  export default Countries