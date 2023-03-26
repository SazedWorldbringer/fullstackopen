import Feedback from "./Feedback"

const FeedbackList = ({ options }) => {
  return (
    <div>
      {options.map((option) =>
        <Feedback option={option.name} optionValue={option.value} key={option.id} />
      )}
    </div>
  )
}

export default FeedbackList
