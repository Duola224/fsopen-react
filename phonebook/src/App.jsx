import { useEffect, useState } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([])

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

  useEffect(() => {
    axios
    .get("http://localhost:3001/persons")
    .then(resp => {
      setPersons(resp.data)
    })
  }, [])

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