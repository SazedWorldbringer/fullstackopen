const Total = ({ parts }) => (
    <p>Number of exercises {parts.reduce((acc, obj) => acc + obj.exercises, 0)}</p>
)

export default Total
