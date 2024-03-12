import { useState } from 'react'

const Button = ({ handleClickBtn, text }) => <button onClick={handleClickBtn}>{text}</button>
const StatisticLine = ({ text, value }) => <p><span>{text}</span> <span>{value}</span></p>

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  if (!(good + bad + neutral)) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>

    )
  }

  return (
    <>
      <h1>statistics</h1>
      <StatisticLine text="Good: " value={good} />
      <StatisticLine text="Neutral: " value={neutral} />
      <StatisticLine text="Bad: " value={bad} />
      <StatisticLine text="All: " value={all} />
      <StatisticLine text="Average: " value={(good - bad) / all} />
      <StatisticLine text="Positive: " value={(good / all * 100) + ' %'} />
    </>
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
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App