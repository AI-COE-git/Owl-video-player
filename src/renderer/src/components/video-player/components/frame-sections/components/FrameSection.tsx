import {
  AngleButton,
  CheckIconWrapper,
  FrameSectionContainer,
  FrameSectionDetail,
  FrameSectionInput,
  FrameSectionNumber
} from './style'
import {
  VideoSection,
  setAngle,
  setOverrideCount
} from '../../../../../../store/reducers/videoReducer'
import { useAppDispatch } from '../../../../../../store/store'
import { useState } from 'react'
import { isValidAngle } from '../../../../../../../utils/isValidAngle'
import { FrameSectionCountDetailContainer } from '../style'
import { ImCancelCircle } from 'react-icons/im'
import { FaCheck } from 'react-icons/fa'

type Props = {
  section: VideoSection
  index: number
}

const FrameSection: React.FC<Props> = ({ section, index }) => {
  const dispatch = useAppDispatch()
  const [angleInput, setAngleInput] = useState<number>()
  const [openAngleInput, setOpenAngleInput] = useState<boolean>(false)

  const [showCancel, setShowCancel] = useState(false)
  const [countInput, setCountInput] = useState<number>()
  const [openCountInput, setOpenCountInput] = useState<boolean>(false)

  const handleKeyDownAngle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (isValidAngle(angleInput)) {
        angleHandler()
      } else {
        alert('Please enter a valid angle (0-360 degrees).')
      }
    }
  }

  const handleKeyDownCount = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (countInput) dispatch(setOverrideCount({ id: section.id, count: countInput }))
      setOpenCountInput(false)
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
          onKeyDown={handleKeyDownAngle}
          onChange={async (e) => setAngleInput(parseInt(e.target.value))}
        />
      )}
      {section.angle !== undefined && (
        <FrameSectionDetail>Angle: {section.angle}</FrameSectionDetail>
      )}
      {section.countLeft !== undefined && !openCountInput && (
        <FrameSectionCountDetailContainer>
          Count: {section.overrideCount || section.countLeft}
          <CheckIconWrapper
            onMouseEnter={() => setShowCancel(true)}
            onMouseLeave={() => setShowCancel(false)}
          >
            {showCancel ? <ImCancelCircle onClick={() => setOpenCountInput(true)} /> : <FaCheck />}
          </CheckIconWrapper>
        </FrameSectionCountDetailContainer>
      )}
      {openCountInput && (
        <FrameSectionInput
          type="number"
          onKeyDown={handleKeyDownCount}
          onChange={async (e) => setCountInput(parseInt(e.target.value))}
        />
      )}
    </FrameSectionContainer>
  )
}

export default FrameSection
