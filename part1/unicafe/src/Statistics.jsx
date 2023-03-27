const Statistics = ({ total, good, bad }) => (
  <div>
    <div>all {total}</div>
    <div>average {(good - bad) / total}</div>
    <div>positive {(good / (total)) * 100} %</div>
  </div>
)

export default Statistics
