import { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../../store/store'
import FrameSection from './components/FrameSection'
import { Button, FrameSectionsContainer, FramesContainer } from './style'

type Props = {}

const FrameSections: React.FC<Props> = ({}) => {
  const sections = useAppSelector((state) => state.video.sections)
  const [showFrames, setShowFrames] = useState<boolean>(false)
  const framesContainerRef = useRef<HTMLDivElement>(null)
  const prevSectionsAnglesRef = useRef<(number | undefined)[]>([])

  useEffect(() => {
    if (framesContainerRef.current) {
      const prevSectionsAngles = prevSectionsAnglesRef.current
      const currentSectionsAngles = sections.map((section) => section.angle)

      // Check if there are non-angle changes
      const hasNonAngleChanges = !prevSectionsAngles.every((prevAngle, index) => {
        return prevAngle === currentSectionsAngles[index]
      })

      // Scroll only if there are non-angle changes
      if (!hasNonAngleChanges) {
        framesContainerRef.current.scrollTo({
          top: framesContainerRef.current.scrollHeight,
          behavior: 'smooth'
        })
      }
    }

    // Update prevSectionsAnglesRef with the current value of angles
    prevSectionsAnglesRef.current = sections.map((section) => section.angle)
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
