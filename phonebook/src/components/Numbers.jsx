import Person from './Person'

const Numbers = ({ search, persons }) =>
  <>{!search ?
    <>{persons.map(person =>
      <Person key={person.id} name={person.name} number={person.number} />
    )} </> : persons.filter(personToFilter => personToFilter.name.toLowerCase().includes(search.toLowerCase())).map(
      personFiltered =>
        <Person key={personFiltered.id} name={personFiltered.name} number={personFiltered.number} />
    )}
  </>

  export default Numbers