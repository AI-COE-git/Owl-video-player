import { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../../store/store'
import FrameSection from './components/FrameSection'
import { Button, FrameSectionsContainer, FramesContainer } from './style'

type Props = {}

const FrameSections: React.FC<Props> = ({}) => {
  const sections = useAppSelector((state) => state.video.sections)
  const [showFrames, setShowFrames] = useState<boolean>(false)
  const framesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (framesContainerRef.current) {
      framesContainerRef.current.scrollTo({
        top: framesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [sections])

  return (
    <FrameSectionsContainer>
      <Button onClick={() => setShowFrames((prev) => !prev)}>
        {showFrames ? 'Close' : 'Open'} Frames
      </Button>
      <FramesContainer ref={framesContainerRef}>
        {showFrames &&
          sections.map((section, index) => (
            <FrameSection key={section.id} section={section} index={index} />
          ))}
      </FramesContainer>
    </FrameSectionsContainer>
  )
}

export default FrameSections
