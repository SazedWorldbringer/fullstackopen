import StatisticLine from "./StatisticLine"

const Statistics = ({ stats }) => (
  <tbody>
    {stats.map((stat) =>
      <StatisticLine text={stat.name} value={stat.value} key={stat.id} />)
    }
  </tbody>
)


export default Statistics
