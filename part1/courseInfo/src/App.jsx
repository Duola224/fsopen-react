
const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.name} {props.exercises}</p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part name={props.parts[0].part} exercises={props.parts[0].exercise} />
      <Part name={props.parts[1].part} exercises={props.parts[1].exercise} />
      <Part name={props.parts[2].part} exercises={props.parts[2].exercise} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.total}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const parts = [
    { "part": part1, "exercise": exercises1 },
    { "part": part2, "exercise": exercises2 },
    { "part": part3, "exercise": exercises3 }
  ];
  return (
    <div>
      <Header course={course} />
      <h2>Exercises</h2>
      <Content parts={parts} />
      <h2>Total</h2>
      <Total Number of exercises total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App