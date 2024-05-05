import { useAppSelector } from '../../../../../store/store'
import {
  ButtonsSection,
  FileInput,
  FrameButtonRight,
  FrameButtonLeft,
  StyledFrameSection,
  StyledSpan,
  TaskbarContainer
} from './style'
import { FrameRateAction } from '../../../../types/enums/frame-rate-action'
import { useEffect, useState } from 'react'

type Props = {
  handleFileInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  frameRate: number
  setFrameRate: React.Dispatch<React.SetStateAction<number>>
}

const Tasksbar: React.FC<Props> = ({ handleFileInputChange, frameRate, setFrameRate }) => {
  const video = useAppSelector((state) => state.video)
  const [disabled, setDisabled] = useState<boolean>(!video.src)

  useEffect(() => {
    setDisabled(!video.src)
  }, [video])

  const handleFrameRate = (action: FrameRateAction) => {
    if (disabled) return
    setFrameRate((prev) =>
      action === FrameRateAction.INCREMENT && frameRate !== video.frames
        ? prev + 1
        : action === FrameRateAction.DECREMENT && frameRate !== 1
          ? prev - 1
          : prev
    )
  }

  return (
    <TaskbarContainer>
      <FileInput
        id="fileInput"
        type="file"
        accept="video/mp4, video/webm, video/ogg"
        onChange={handleFileInputChange}
      />
      <ButtonsSection disabled={disabled}>
        <StyledFrameSection>
          <FrameButtonLeft onClick={() => handleFrameRate(FrameRateAction.DECREMENT)}>
            -
          </FrameButtonLeft>
          <StyledSpan>Frame Rate: {frameRate}</StyledSpan>
          <FrameButtonRight onClick={() => handleFrameRate(FrameRateAction.INCREMENT)}>
            +
          </FrameButtonRight>
        </StyledFrameSection>
      </ButtonsSection>
    </TaskbarContainer>
  )
}

export default Tasksbar
