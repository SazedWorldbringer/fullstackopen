const Header = ({ course }) => (
  <h1>{course}</h1>
)

const Total = ({ exercises }) => (
  <p>Number of exercises {exercises.reduce((prev, curr) => prev + curr, 0)}</p>
)

const Part = ({ part, exercise }) => (
  <p>{part} {exercise}</p>
)

const Content = ({ parts, exercises }) => (
  <>
    <Part part={parts[0]} exercise={exercises[0]} />
    <Part part={parts[1]} exercise={exercises[1]} />
    <Part part={parts[2]} exercise={exercises[2]} />
  </>
)

const App = () => {
  const course = "Half Stack application development"
  const part1 = "Fundamentals of React"
  const exercises1 = 10
  const part2 = "Using props to pass data"
  const exercises2 = 7
  const part3 = "State of a component"
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]} />
      <Total exercises={[exercises1, exercises2, exercises3]} />
    </div>
  )
}

export default App
