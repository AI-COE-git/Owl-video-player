import {
  AngleButton,
  FrameSectionContainer,
  FrameSectionDetail,
  FrameSectionInput,
  FrameSectionNumber
} from './style'
import { VideoSection, setAngle } from '../../../../store/reducers/videoReducer'
import { useAppDispatch } from '../../../../store/store'
import { useState } from 'react'
import { isValidAngle } from '../../../../../utils/isValidAngle'

type Props = {
  section: VideoSection
  index: number
}

const FrameSection: React.FC<Props> = ({ section, index }) => {
  const dispatch = useAppDispatch()
  const [angleInput, setAngleInput] = useState<number>()
  const [openAngleInput, setOpenAngleInput] = useState<boolean>(false)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (isValidAngle(angleInput)) {
        angleHandler()
      } else {
        alert('Please enter a valid angle (0-360 degrees).')
      }
    }
  }

  const angleHandler = () => {
    if (angleInput !== undefined) dispatch(setAngle({ id: section.id, angle: angleInput }))
    setOpenAngleInput(false)
  }

  return (
    <FrameSectionContainer>
      <FrameSectionNumber>{index}. </FrameSectionNumber>
      {section.startFrame !== undefined && (
        <FrameSectionDetail>Start Frame: {section.startFrame}</FrameSectionDetail>
      )}
      {section.endFrame !== undefined && (
        <FrameSectionDetail>End Frame: {section.endFrame}</FrameSectionDetail>
      )}
      {section.endFrame !== undefined && section.angle === undefined && !openAngleInput && (
        <AngleButton onClick={() => setOpenAngleInput(true)}>Add Angle</AngleButton>
      )}
      {openAngleInput && (
        <FrameSectionInput
          type="number"
          onKeyDown={handleKeyDown}
          onChange={async (e) => setAngleInput(parseInt(e.target.value))}
        />
      )}
      {section.angle !== undefined && (
        <FrameSectionDetail>Angle: {section.angle}</FrameSectionDetail>
      )}
      {section.countLeft !== undefined && (
        <FrameSectionDetail>Count Left: {section.countLeft}</FrameSectionDetail>
      )}
      {section.countRight !== undefined && (
        <FrameSectionDetail>Count Right: {section.countRight}</FrameSectionDetail>
      )}
    </FrameSectionContainer>
  )
}

export default FrameSection
