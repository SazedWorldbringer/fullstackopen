import StatisticLine from "./StatisticLine"

const Statistics = ({ stats }) => (
  <>
    {stats.map((stat) =>
      <StatisticLine text={stat.name} value={stat.value} key={stat.id} />)
    }
  </>
)


export default Statistics
