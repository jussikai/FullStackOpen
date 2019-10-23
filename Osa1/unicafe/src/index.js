import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Stats = (props) => {

    const sum = props.g + props.n + props.b
    const avg = (props.g*1 + props.b *(-1))/sum
    const pos = props.g/sum * 100
    return(
        <div>
        <div>good {props.g}</div>
        <div>neutral {props.n}</div>
        <div>bad {props.b}</div>    
        <div>all {sum}</div>
        <div>average {avg}</div>
        <div>positive {pos}%</div>
        </div>
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <h1>statistics</h1>
      <Stats g = {good} n = {neutral} b = {bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)