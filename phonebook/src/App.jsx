import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import personService from './services/person'
import './index.css'

const Notification = ({ message, error }) => {
  if (!message) return null
  return (
    <div className='error' style={error}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [person, setPerson] = useState({})
  const [search, setSearch] = useState('')
  const [{ message, style }, setMessage] = useState({ message: null, style: {} })

  const errorStyle = {
    'color': 'red',
    'background': 'lightgrey',
    'padding': 10
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const deleteNumber = (person) => {
    if (window.confirm(`Do you want to delete ${person.name}`)) {
      personService.remove(person.id)
        .then(resp => setPersons(
          persons.filter(pers => pers.id !== resp.id)
        ))
        .catch(error => {
          setMessage({ message: `Error message: ${error.message}`, style: { ...errorStyle } })
          setTimeout(() => setMessage({ message: null, style: {} }), 3000)
        })
    } else {
      console.log("Deletion aborted!");
    }
  }

  const addName = (event) => {
    event.preventDefault()
    const found = persons.find((person) => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase())
    if (!found) {
      personService.create({ name: newName, number: newNumber })
        .then(newPers => {
          setPersons(persons.concat(newPers))
          setMessage({ message: `Added ${newPers.name}`, style: {} })
          setTimeout(() => setMessage({ message: null, style: {} }), 3000)
        })
        .catch(error => {
          setMessage({ message: `Error message: ${error.message}`, style: { ...errorStyle } })
          setTimeout(() => setMessage({ message: null, style: {} }), 3000)
        })
    } else if (found.number !== newNumber) {
      if (window.confirm(`Do you want to update ${newName}'s number ?`)) {
        personService.update(found.id, { name: newName, number: newNumber })
          .then(persUpdated => {
            setPersons(
              persons.map(pers => pers.id !== persUpdated.id ? pers : persUpdated)
            )
            setMessage({ message: `Update ${persUpdated.name}`, style: {} })
            setTimeout(() => setMessage({ message: null, style: {} }), 3000)
          })
          .catch(error => {
            setMessage({ message: `Error message: ${error.message}`, style: { ...errorStyle } })
            setTimeout(() => setMessage({ message: null, style: {} }), 3000)
          })
      }
    } else {
      alert(`${newName} already exist with the same number !`)
    }
    setNewName('')
    setNewNumber('')
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    personService.getAll()
      .then(data => setPersons(data))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <PersonForm submitFn={addName} name={newName} number={newNumber} handleName={handleNameChange} handleNumber={handleNumberChange} />
      <h2>Numbers</h2>
      <Notification message={message} error={style} />
      <Numbers search={search} persons={persons} deleteNumber={deleteNumber} />

    </div>
  )
}

export default App