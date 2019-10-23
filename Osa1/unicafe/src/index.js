import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
      {text}
    </button>
  )

const Statistics = (props) => {

    const sum = props.g + props.n + props.b
    if(sum === 0){
        return(
            <div>
                No feedback given
            </div>
        )
    }
    const avg = (props.g*1 + props.b *(-1))/sum
    const pos = props.g/sum * 100
    return(
        <div>
            <Statistic text = "good" value = {props.g}/>
            <Statistic text = "neutral" value = {props.n}/>
            <Statistic text = "bad" value = {props.b}/>    
        <Statistic text = "all" value = {sum}/>
        <Statistic text = "average" value = {avg}/>
        <Statistic text = "positive" value = {pos} mark = "%"/>
        </div>
    )
}

const Statistic = (props) => {
    return(
        <div>
            {props.text} {props.value} {props.mark}
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
      <Button onClick={handleGoodClick} text = "good"/>
      <Button onClick={handleNeutralClick} text = "neutral"/>
      <Button onClick={handleBadClick} text = "bad"/>
      <h1>statistics</h1>
      <Statistics g = {good} n = {neutral} b = {bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)