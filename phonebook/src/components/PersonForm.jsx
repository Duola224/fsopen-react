const PersonForm = (props) =>
  <>
    <form onSubmit={props.submitFn}>
      <div>
        <label htmlFor="name">name:</label> <input value={props.name} onChange={props.handleName} /> <span> </span>
        <label htmlFor="number">number:</label> <input value={props.number} onChange={props.handleNumber} />
        <button type="submit">add</button>
      </div>
    </form>
  </>

  export default PersonForm