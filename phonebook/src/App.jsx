import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [person, setPerson] = useState({})
  const [search, setSearch] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const found = persons.find((person) => person.name.toLocaleLowerCase() == newName.toLocaleLowerCase())
    !found ?
      setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length + 1 })) : alert(`${newName} already exist!`)
    setNewName('')
    setNewNumber('')
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <PersonForm submitFn={addName} name={newName} number={newNumber} handleName={handleNameChange} handleNumber={handleNumberChange} />
      <h2>Numbers</h2>
      <Numbers search={search} persons={persons} />
    </div>
  )
}

export default App