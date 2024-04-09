import { useState } from 'react'
import { useAppSelector } from '../../../store/store'
import FrameSection from './components/FrameSection'
import { Button, FrameSectionsContainer, FramesContainer } from './style'

type Props = {}

const FrameSections: React.FC<Props> = ({}) => {
  const sections = useAppSelector((state) => state.video.sections)
  const [showFrames, setShowFrames] = useState<boolean>(false)
  return (
    <FrameSectionsContainer>
      <Button onClick={() => setShowFrames((prev) => !prev)}>
        {showFrames ? 'Close' : 'Open'} Frames
      </Button>
      <FramesContainer>
        {showFrames &&
          sections.map((section, index) => (
            <FrameSection key={section.id} section={section} index={index} />
          ))}
      </FramesContainer>
    </FrameSectionsContainer>
  )
}

export default FrameSections
