import { useState } from 'react'

const Display = (props) => <><p>{props.anecdote}</p></>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
    'The more you know, the more you realize you know nothing. -- Socrates',
    'The details are not the details. They make the design.',
    'Never confuse a single defeat with a final defeat. -- F. S. Fitzgerald',
    'Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time. --Thomas Edison'

  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})
  const [maxVote, setMaxVote] = useState(0)

  let arr = Array(anecdotes.length).fill(0)

  const nextAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length)
  )

  const addVote = () => {
    const newArr = { ...votes }
    typeof (newArr[selected]) == "number" ? newArr[selected] += 1 : newArr[selected] = 1
    setVotes({ ...newArr })
    //setMaxVote(getMax(newArr))
  }

  const getMax = () => {
    let max = 0
    if (Object.keys(votes).length) {
      let sortVotes = []
      for (let key in votes) {
        sortVotes.push([key, votes[key]])
      }
      sortVotes.sort((a, b) => b[1] - a[1])
      max = sortVotes[0][0]
    }
    return max
  }

  if (!Object.keys(votes).length) {
    return (
      <>
        <h1>Anecdote of the day !</h1>
        <Display anecdote={anecdotes[selected]} />
        <p><i>This anecdote has: {typeof (votes[selected]) != 'number' ? 0 : votes[selected]}</i></p>
        <Button text="Like" handleClick={addVote} /><span> </span>
        <Button text="next anecdote" handleClick={nextAnecdote} />
      </>
    )
  } else {
    return (
      <>
        <h1>Anecdote of the day !</h1>
        <Display anecdote={anecdotes[selected]} />
        <p><i>This anecdote has: {typeof (votes[selected]) != 'number' ? 0 : votes[selected]}</i></p>
        <Button text="Like" handleClick={addVote} /><span> </span>
        <Button text="next anecdote" handleClick={nextAnecdote} />
        <h2>Anecdote with most votes </h2>
        <Display anecdote={anecdotes[getMax()]} />
        <p><i>This anecdote has: {votes[getMax()]}</i></p>
      </>
    )
  }
}

export default App