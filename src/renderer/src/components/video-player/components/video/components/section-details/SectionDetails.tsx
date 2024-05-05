import { useState } from 'react'
import {
  AngleButton,
  CheckIconWrapper,
  FrameSectionCountDetailContainer,
  FrameSectionDetail,
  FrameSectionIndex,
  FrameSectionInput,
  SectionDetailsContainer,
  SectionDetailsData
} from './style'
import { useAppDispatch, useAppSelector } from '../../../../../../../store/store'
import {
  VideoSection,
  setAngle,
  setOverrideCount,
  setShowSectionDetails
} from '../../../../../../../store/reducers/videoReducer'
import { isValidAngle } from '../../../../../../../../utils/isValidAngle'
import { IconWrapper } from './style'
import { RiExpandUpDownFill } from 'react-icons/ri'
import { FaCheck } from 'react-icons/fa'
import { ImCancelCircle } from 'react-icons/im'

type Props = {
  section: VideoSection
  showSectionDetails?: boolean
  index?: number
}

const SectionDetails: React.FC<Props> = ({ section, index, showSectionDetails = false }) => {
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
    <SectionDetailsContainer>
      <SectionDetailsData>
        {index !== undefined && <FrameSectionIndex>{index + 1}.</FrameSectionIndex>}
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
              {showCancel ? (
                <ImCancelCircle onClick={() => setOpenCountInput(true)} />
              ) : (
                <FaCheck />
              )}
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
      </SectionDetailsData>
      {showSectionDetails && (
        <IconWrapper>
          <RiExpandUpDownFill
            onClick={() => dispatch(setShowSectionDetails(!showSectionDetails))}
          />
        </IconWrapper>
      )}
    </SectionDetailsContainer>
  )
}

export default SectionDetails
