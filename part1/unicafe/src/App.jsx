import { useState } from "react"
import Button from "./Button"
import FeedbackList from "./FeedbackList"
import Header from "./Header"

import { nanoid } from "nanoid"
import Statistics from "./Statistics"

function App() {
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

  const options = [
    { name: "good", value: good, id: nanoid() },
    { name: "neutral", value: neutral, id: nanoid() },
    { name: "bad", value: bad, id: nanoid() },
  ]

  const total = good + bad + neutral

  return (
    <div>
      <Header text="give feedback" />

      <div>
        <Button handleClick={handleGoodClick} text="good" />
        <Button handleClick={handleNeutralClick} text="neutral" />
        <Button handleClick={handleBadClick} text="bad" />
      </div>

      <Header text="statistics" />

      <FeedbackList options={options} />
      <Statistics total={total} good={good} bad={bad} />
    </div>
  )
}


export default App
