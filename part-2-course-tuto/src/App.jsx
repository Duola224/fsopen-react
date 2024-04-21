import { useEffect, useState } from 'react'
import axios from 'axios'

import Note from './components/Note'
import noteService from './services/notes'
import './index.css'
import Notification from './components/Notification'

const Footer = () => {
  const footerStyle = {
    fontStyle: 'italic',
    color: 'green',
    fontSize: 16

  }
  
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Full Stack Web DEV from the University of Helsinki 2024</em>
    </div>
  )
}

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMsg, setErrorMsg] = useState('some error happened ...!')

  useEffect(() => {
    noteService.getAll()
    .then(initialNotes => setNotes(initialNotes))
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObj = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    noteService.create(noteObj)
    .then(returnObj => setNotes(notes.concat(returnObj)))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const noteToShow = showAll ? notes : notes.filter(note => note.important)

  const handleToggleBtn = id => {
    const note = notes.find(n => n.id === id)
    const updatedNote = {...note, important: !note.important}
    noteService
      .update(id, updatedNote)
      .then(retNote => {
        setNotes(notes.map(n => n.id !== id ? n : retNote))
      })
      .catch(error => {
        setErrorMsg(`Note ${note.content} was already removed from server:  ${error.message}`)
        setTimeout(()=> {
          setErrorMsg(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }
  
  return (
    <div>
      <h1>Notes</h1>
      <Notification message='' />
      <ul>
        {noteToShow.map(note => <Note key={note.id} note={note} toggleNoteImport={() => handleToggleBtn(note.id)}/>)}
      </ul>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <form onSubmit={addNote}>
        <input type="text"
          value={newNote}
          placeholder='Enter a note, please!'
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App