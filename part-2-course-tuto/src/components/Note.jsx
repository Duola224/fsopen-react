const Note = ({ note, toggleNoteImport }) => {
  const label = note.important ? 'not important' : 'need to be important'
  return (
    <li className="note">
      {note.content}
      <button onClick={toggleNoteImport}>{label}</button>
    </li>
  )
}

export default Note