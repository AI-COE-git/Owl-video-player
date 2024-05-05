import { useState } from 'react'
import {
  AngleButton,
  CheckIconWrapper,
  FrameSectionCountDetailContainer,
  FrameSectionDetail,
  FrameSectionInput,
  SectionDetailsContainer,
  SectionDetailsData
} from './style'
import { useAppDispatch, useAppSelector } from '../../../../../../../store/store'
import {
  setAngle,
  setOverrideCount,
  setShowSectionDetails
} from '../../../../../../../store/reducers/videoReducer'
import { isValidAngle } from '../../../../../../../../utils/isValidAngle'
import { IconWrapper } from './style'
import { RiExpandUpDownFill } from 'react-icons/ri'
import { FaCheck } from 'react-icons/fa'
import { ImCancelCircle } from 'react-icons/im'

const SectionDetails = () => {
  const lastSection = useAppSelector(
    (state) => state.video.sections[state.video.sections.length - 1]
  )

  const showSectionDetails = useAppSelector((state) => state.video.showSectionDetails)

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
      if (countInput) dispatch(setOverrideCount({ id: lastSection.id, count: countInput }))
      setOpenCountInput(false)
    }
  }

  const angleHandler = () => {
    if (angleInput !== undefined) dispatch(setAngle({ id: lastSection.id, angle: angleInput }))
    setOpenAngleInput(false)
  }

  return (
    <SectionDetailsContainer>
      <SectionDetailsData>
        {lastSection.startFrame !== undefined && (
          <FrameSectionDetail>Start Frame: {lastSection.startFrame}</FrameSectionDetail>
        )}
        {lastSection.endFrame !== undefined && (
          <FrameSectionDetail>End Frame: {lastSection.endFrame}</FrameSectionDetail>
        )}
        {lastSection.endFrame !== undefined &&
          lastSection.angle === undefined &&
          !openAngleInput && (
            <AngleButton onClick={() => setOpenAngleInput(true)}>Add Angle</AngleButton>
          )}
        {openAngleInput && (
          <FrameSectionInput
            type="number"
            onKeyDown={handleKeyDownAngle}
            onChange={async (e) => setAngleInput(parseInt(e.target.value))}
          />
        )}
        {lastSection.angle !== undefined && (
          <FrameSectionDetail>Angle: {lastSection.angle}</FrameSectionDetail>
        )}
        {lastSection.countLeft !== undefined && !openCountInput && (
          <FrameSectionCountDetailContainer>
            Count: {lastSection.overrideCount || lastSection.countLeft}
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
      <IconWrapper>
        <RiExpandUpDownFill onClick={() => dispatch(setShowSectionDetails(!showSectionDetails))} />
      </IconWrapper>
    </SectionDetailsContainer>
  )
}

export default SectionDetails
