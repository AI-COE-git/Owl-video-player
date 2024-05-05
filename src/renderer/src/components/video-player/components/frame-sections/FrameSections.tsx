import { useEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../../../../store/store'
import { FrameSectionsContainer, FramesContainer, ShowFramesButton } from './style'
import SectionDetails from '../video/components/section-details/SectionDetails'
import { FaArrowCircleDown, FaArrowCircleUp } from 'react-icons/fa'

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

      // Check if there are angle changes
      const hasAngleChanges = !prevSectionsAngles.every((prevAngle, index) => {
        return prevAngle === currentSectionsAngles[index]
      })

      // Scroll only if there are non-angle changes
      if (!hasAngleChanges) {
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
      <ShowFramesButton>
        {showFrames ? (
          <FaArrowCircleDown size={20} onClick={() => setShowFrames((prev) => !prev)} />
        ) : (
          <FaArrowCircleUp size={20} onClick={() => setShowFrames((prev) => !prev)} />
        )}
      </ShowFramesButton>
      <FramesContainer ref={framesContainerRef}>
        {showFrames &&
          sections.map((section, index) => (
            <SectionDetails key={section.id} section={section} index={index} />
          ))}
      </FramesContainer>
    </FrameSectionsContainer>
  )
}

export default FrameSections
