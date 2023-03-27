import { useState } from "react"
import Button from "./Button"
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

  const total = good + bad + neutral

  const stats = [
    { name: "good", value: good, id: nanoid() },
    { name: "neutral", value: neutral, id: nanoid() },
    { name: "bad", value: bad, id: nanoid() },
    { name: "all", value: total, id: nanoid() },
    { name: "average", value: (good - bad) / total, id: nanoid() },
    { name: "positive", value: `${(good / total) * 100}%`, id: nanoid() },
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

      {good || neutral || bad ? (
        <div>
          <Statistics stats={stats}/>
        </div>
      ) : (
        <p>No feedback given.</p>
      )}
    </div>
  )
}


export default App
