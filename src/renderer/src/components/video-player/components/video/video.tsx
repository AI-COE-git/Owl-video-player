// Video.tsx
import React, { useEffect } from 'react'
import { Container, ControlsContainer, StyledVideo } from './style'
import Controls from './components/controls/Controls'
import SectionDetails from './components/section-details/SectionDetails'
import { useAppSelector } from '../../../../../store/store'
import { useGenerateCsvMutation } from '../../../../../store/api-slices/fileSlice'
import { writeToCSV } from '../../../../services/csvWriter.service'

interface VideoProps {
  videoRef: React.RefObject<HTMLVideoElement>
  src: string
  onEnded: () => void
  getCurrentExactFrame: () => number
}

const Video: React.FC<VideoProps> = ({ videoRef, src, onEnded, getCurrentExactFrame }) => {
  const showSectionDetails = useAppSelector((state) => state.video.showSectionDetails)
  const sections = useAppSelector((state) => state.video.sections)
  const videoName = useAppSelector((state) => state.video.name)

  const [generateCsv] = useGenerateCsvMutation()

  useEffect(() => {
    if (videoRef.current && videoRef.current.src !== src) {
      videoRef.current.src = src
    }
  }, [src])

  useEffect(() => {
    const csv_data = writeToCSV(sections)
    generateCsv({ video_name: videoName, csv_data })
  }, [sections])

  return (
    <Container>
      <StyledVideo ref={videoRef} onEnded={onEnded}>
        <source src={src} type="video/mp4" />
        <source src={src} type="video/webm" />
        <source src={src} type="video/ogg" />
      </StyledVideo>
      <ControlsContainer>
        {showSectionDetails ? (
          <SectionDetails />
        ) : (
          <Controls videoRef={videoRef} getCurrentExactFrame={getCurrentExactFrame} />
        )}
      </ControlsContainer>
    </Container>
  )
}

export default Video
