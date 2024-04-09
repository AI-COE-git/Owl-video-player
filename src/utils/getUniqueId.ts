import { v4 as uuidv4 } from 'uuid'

export const getUniqueId = (): string => {
  const uniqueId = uuidv4()
  return uniqueId
}
