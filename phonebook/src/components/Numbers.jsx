import Person from './Person'

const Numbers = ({ search, persons, deleteNumber }) => {
  return (<>{!search ?
    <>{persons.map(person =>
      <Person key={person.id} name={person.name} number={person.number} handleClick={() => deleteNumber(person)} />
    )} </> : persons.filter(personToFilter => personToFilter.name.toLowerCase().includes(search.toLowerCase())).map(
      personFiltered =>
        <Person key={personFiltered.id} name={personFiltered.name} number={personFiltered.number} handleClick={() => deleteNumber(personFiltered)} />
    )}
  </>)
}

export default Numbers