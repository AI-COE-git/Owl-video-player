export const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600)
  const minutes = Math.floor((timeInSeconds % 3600) / 60)
  const seconds = Math.floor(timeInSeconds % 60)
  const milliseconds = Math.floor((timeInSeconds - Math.floor(timeInSeconds)) * 1000)

  let timeString = ''
  if (hours > 0) {
    timeString += `${hours.toString().padStart(2, '0')}:`
  }
  if (minutes > 0 || hours > 0) {
    timeString += `${minutes.toString().padStart(2, '0')}:`
  }
  timeString += `${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`

  return timeString
}
