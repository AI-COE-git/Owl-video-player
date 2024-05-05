import { VideoSection } from '../../store/reducers/videoReducer'

export const writeToCSV = (sectionDetails: VideoSection[]) => {
  const csvHeaders = ['start frame', 'end frame', 'count left', 'count right', 'angle']
  const csvContent = convertToCSV(csvHeaders, sectionDetails)
  return csvContent
}

const convertToCSV = (sectionHeaders: string[], sectionDetails: VideoSection[]): string => {
  const header = sectionHeaders.join(',')
  const rows = sectionDetails.map(
    (section) =>
      `${section.startFrame},${section.endFrame},${section.countLeft},${section.countRight},${section.angle}`
  )
  return `${header}\n${rows.join('\n')}`
}
