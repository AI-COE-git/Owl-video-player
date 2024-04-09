export const isValidAngle = (angle) => {
  return !isNaN(angle) && angle >= 0 && angle <= 360
}
