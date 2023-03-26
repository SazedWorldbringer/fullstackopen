import { useState } from "react"
import Button from "./Button"
import FeedbackList from "./FeedbackList"
import Header from "./Header"

import { nanoid } from "nanoid"

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
    </div>
  )
}


export default App
