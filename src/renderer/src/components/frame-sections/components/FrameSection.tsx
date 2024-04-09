import { FrameSectionContainer, FrameSectionDetail, FrameSectionNumber } from './style'
import { Button } from '../style'
import { VideoSection, setAngle } from '../../../../store/reducers/videoReducer'
import { useAppDispatch } from '../../../../store/store'
import { useEffect, useState } from 'react'

type Props = {
  section: VideoSection
  index: number
}

const FrameSection: React.FC<Props> = ({ section, index }) => {
  const dispatch = useAppDispatch()
  const [angleInput, setAngleInput] = useState<number>()
  const [openAngleInput, setOpenAngleInput] = useState<boolean>(false)

  // useEffect(() => {
  //   window.addEventListener('keydown', handleKeyDown)
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown)
  //   }
  // }, [])

  // const handleKeyDown = (event: KeyboardEvent) => {
  //   if (event.key === 'Enter') {
  //     if (angleInput) dispatch(setAngle({ index, angle: angleInput }))
  //     setOpenAngleInput(false)
  //   }
  // }

  return (
    <FrameSectionContainer>
      <FrameSectionNumber>{index}. </FrameSectionNumber>
      {section.startFrame !== undefined && (
        <FrameSectionDetail>Start Frame: {section.startFrame}</FrameSectionDetail>
      )}
      {section.endFrame !== undefined && (
        <FrameSectionDetail>End Frame: {section.endFrame}</FrameSectionDetail>
      )}
      {section.countLeft !== undefined && (
        <FrameSectionDetail>Count Left: {section.countLeft}</FrameSectionDetail>
      )}
      {section.countRight !== undefined && (
        <FrameSectionDetail>Count Right: {section.countRight}</FrameSectionDetail>
      )}
      {section.angle !== undefined && (
        <FrameSectionDetail>Angle: {section.angle}</FrameSectionDetail>
      )}
      {/* {section.endFrame !== undefined && section.angle === undefined && !openAngleInput && (
        <Button onClick={() => setOpenAngleInput(true)}>+ Angle</Button>
      )}
      {openAngleInput && (
        <input type="number" onChange={async (e) => setAngleInput(parseInt(e.target.value))} />
      )} */}
    </FrameSectionContainer>
  )
}

export default FrameSection
