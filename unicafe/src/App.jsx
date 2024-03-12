import { useState } from 'react'

const Button = ({ handleClickBtn, text }) => <button onClick={handleClickBtn}>{text}</button>
const Display = ({ textToDisplay, value }) => <p><span>{textToDisplay}</span> <span>{value}</span></p>

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  return (
    <>
      <h1>statistics</h1>
      <Display textToDisplay="Good: " value={good} />
      <Display textToDisplay="Neutral: " value={neutral} />
      <Display textToDisplay="Bad: " value={bad} />
      <Display textToDisplay="All: " value={all} />
      <Display textToDisplay="Average: " value={(good - bad) / all} />
      <Display textToDisplay="Positive: " value={(good / all * 100) + ' %'} />
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

  if (!(good + bad + neutral)) {
    return (
      <div>
        <h1>give feedback, please!</h1>
        <Button handleClickBtn={goodFeedback} text="Good" />
        <Button handleClickBtn={neutralFeedback} text="Neutral" />
        <Button handleClickBtn={badFeedback} text="Bad" />
      </div>
    )
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