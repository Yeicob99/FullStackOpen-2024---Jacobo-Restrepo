import { useState } from 'react'

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text}: {value}
    </p>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <h1>Estadísticas</h1>
      <table>
        <tbody>
          <tr>
            <td>Bueno</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>Neutro</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>Malo</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>Promedio</td>
            <td>{(good + neutral + bad) / 3}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>{good + neutral + bad}</td>
          </tr>
          <tr>
            <td>Positivo</td>
            <td>{good / (good + neutral + bad) * 100}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // guarda los clics de cada botón en su propio estado

  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={() => setGood(good + 1)} />
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" onClick={() => setBad(bad + 1)} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App