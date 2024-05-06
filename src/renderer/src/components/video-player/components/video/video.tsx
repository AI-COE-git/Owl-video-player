// Video.tsx
import React, { useEffect } from 'react'
import { Container, ControlsContainer, StyledVideo } from './style'
import Controls from './components/controls/Controls'
import SectionDetails from './components/section-details/SectionDetails'
import { useAppSelector } from '../../../../../store/store'
import { useGenerateCsvMutation } from '../../../../../store/api-slices/fileSlice'
import { writeToCSV } from '../../../../services/csvWriter.service'
import FrameSections from '../frame-sections/FrameSections'

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
  const lastSection = useAppSelector(
    (state) => state.video.sections[state.video.sections.length - 1]
  )

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
      {videoRef.current?.src && <FrameSections />}
      <StyledVideo ref={videoRef} onEnded={onEnded}>
        <source src={src} type="video/mp4" />
        <source src={src} type="video/webm" />
        <source src={src} type="video/ogg" />
      </StyledVideo>
      <ControlsContainer>
        {showSectionDetails && lastSection ? (
          <SectionDetails section={lastSection} showSectionDetails={true} />
        ) : (
          <Controls videoRef={videoRef} getCurrentExactFrame={getCurrentExactFrame} />
        )}
      </ControlsContainer>
    </Container>
  )
}

export default Video
