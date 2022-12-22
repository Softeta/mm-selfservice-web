export const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div
      className="inset-x-0 h-candidate-profile-progress-bar bg-emerald transition-all"
      style={{ width: `${progress}%` }}
    ></div>
  )
}
