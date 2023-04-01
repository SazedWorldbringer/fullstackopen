const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <h3>Number of exercises {sum}</h3>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    parts.map(part => (
      <Part key={part.id} part={part} />
    ))
  )
}

const Course = ({ course }) => {
  const sum = course.parts.map(part => part.exercises).reduce((prev, curr) => {
    return prev + curr
  }, 0);

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </>
  )
}

export default Course
