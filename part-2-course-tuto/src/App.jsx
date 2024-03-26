import { useEffect, useState } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
    .get('http://localhost:3001/notes')
    .then(resp => {
      setNotes(resp.data)
    })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObj = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    axios
      .post('http://localhost:3001/notes', noteObj)
      .then(resp => {
        console.log(resp.data)
        setNotes(notes.concat(resp.data))
      })
    setNewNote('')
}

const handleNoteChange = (event) => {
  setNewNote(event.target.value)
}

const noteToShow = showAll ? notes : notes.filter(note => note.important)

const handleToggleBtn = id => {
  const noteToUpdate = notes.find( note => note.id == id)
  const noteUpdated = {...noteToUpdate, important: !noteToUpdate.important}
  axios
    .put(`http://localhost:3001/notes/${id}`, noteUpdated)
    .then(resp => setNotes(
      notes.map( n => n.id !== id ? n : resp.data)
    ))
}

return (
  <div>
    <h1>Notes</h1>
    <ul>
      {noteToShow.map(note =>
        <Note key={note.id} note={note} toggleNoteImport={() => handleToggleBtn(note.id)}/>
      )}
    </ul>
    <div>
      <button onClick={ () => setShowAll(!showAll)}>
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
  </div>
)
}

export default App