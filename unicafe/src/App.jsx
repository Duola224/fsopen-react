import { useState } from 'react'

const Button = ({ handleClickBtn, text }) => <button onClick={handleClickBtn}>{text}</button>
const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if (!(good + bad + neutral)) {
    return (
      <>
        <p>No feedback given</p>
      </>

    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="Good: " value={good} />
        <StatisticLine text="Neutral: " value={neutral} />
        <StatisticLine text="Bad: " value={bad} />
        <StatisticLine text="All: " value={all} />
        <StatisticLine text="Average: " value={(good - bad) / all} />
        <StatisticLine text="Positive: " value={Math.floor(good / all * 100) + ' %'} />
      </tbody>
    </table>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodFeedback = () => {
    const nbGood = good + 1;
    setGood(nbGood);
  }
  const badFeedback = () => {
    const nbBad = bad + 1;
    setBad(nbBad);
  }

  const neutralFeedback = () => {
    const nbNeutral = neutral + 1;
    setNeutral(nbNeutral);
  }

  return (
    <div>
      <h1>give feedback, please!</h1>
      <Button handleClickBtn={goodFeedback} text="Good" />
      <Button handleClickBtn={neutralFeedback} text="Neutral" />
      <Button handleClickBtn={badFeedback} text="Bad" />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App