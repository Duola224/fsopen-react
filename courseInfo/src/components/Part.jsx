const Part = (props) => {
    const {part} = props
    return (
      <>
        <li>{part.name} <strong>{part.exercises}</strong></li>
      </>
    )
  }

  export default Part