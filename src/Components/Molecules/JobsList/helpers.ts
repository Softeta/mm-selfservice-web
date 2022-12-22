export const isNew = (
  previousWeekTimestamp: number,
  createdAt?: Date
): boolean => {
  if (!createdAt) return false

  const jobTimestamp = Date.parse(createdAt.toString())
  return jobTimestamp >= previousWeekTimestamp
}

export const getPreviousWeekTimestamp = () => {
  const now = new Date()
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 7
  ).valueOf()
}
