import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState({})
  const [selected, setSelected] = useState(0)
  const [voteCount, setVoteCount] = useState(0)

  const handleVote = (index) => {
    const newVotes = { ...votes }
    newVotes[index] = (newVotes[index] || 0) + 1
    setVotes(newVotes)
    setVoteCount(newVotes[index] || 0)
  }

  const handleClick = () => {
    const newIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(newIndex)
    setVoteCount(votes[newIndex] || 0)
  }

  const maxVotes = Math.max(...Object.values(votes));
  const mostVotedAnecdote = anecdotes[Object.keys(votes).find(key => votes[key] === maxVotes)];


  return (
    <div>
      {anecdotes[selected]}
      <br />
      <button onClick={handleClick}>next anecdote</button>
      <button onClick={() => handleVote(selected)}>Votar</button>
      <p>Votos: {voteCount}</p>
      <h2> Anécdota con más votos:</h2>
      <p>{mostVotedAnecdote}</p>
      <p>Es la más votada con: {maxVotes} votos</p>
      
    </div>
  )
}

export default App