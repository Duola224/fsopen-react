
const Hello = (props) => {
  console.log('Using props !')
  return (
    <div>
      <p>Props in action</p>
      <span>Welcome Mr. {props.name}, you are {props.age} old</span>
    </div>
  )
}


const App = () => {
  console.log('Multiple components !');
  const now = new Date()
  const age = 32
  const person = {
    firstname: "Mc",
    lastname: "Donalds",
    age: 105
  }

  return (
    <>
      <h1>Greetings {now.toString()}</h1>
      <Hello name="Bob Marley" age={age}/>
      <Hello name="Wyclef Jean" age={12 + 25} />
      <li>{person.firstname}</li>
      <li>{person.lastname}</li>
      <li>{person.age}</li>
    </>
  )
}

export default App;