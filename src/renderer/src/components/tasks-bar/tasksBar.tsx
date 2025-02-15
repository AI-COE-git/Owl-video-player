import { useAppDispatch, useAppSelector } from '../../../store/store'
import {
  useGetCountMutation,
  useSetBlockCountFrameSectionMutation
} from '../../../store/api-slices/blockCountSlice'
import {
  Button,
  ButtonsSection,
  FileInput,
  FrameButtonRight,
  FrameButtonLeft,
  StyledFrameSection,
  StyledSpan,
  TaskbarContainer
} from './style'
import { FrameSection } from '../../types/enums/frame-section'
import { FrameRateAction } from '../../types/enums/frame-rate-action'
import { useEffect, useState } from 'react'
import { startSection, endSection, setCount } from '../../../store/reducers/videoReducer'

type Props = {
  handleFileInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  frameRate: number
  setFrameRate: React.Dispatch<React.SetStateAction<number>>
  getCurrentExactFrame: () => number
}

const Tasksbar: React.FC<Props> = ({
  handleFileInputChange,
  frameRate,
  setFrameRate,
  getCurrentExactFrame
}) => {
  const dispatch = useAppDispatch()
  const video = useAppSelector((state) => state.video)
  const [disabled, setDisabled] = useState<boolean>(!video.src)
  const [setBlockCountFrameSection] = useSetBlockCountFrameSectionMutation()
  const [getCount] = useGetCountMutation()

  const handleFrameSection = async (type: FrameSection) => {
    if (disabled) return
    setDisabled(true)
    const frameNumber = getCurrentExactFrame()
    const lastIndex = video.sections.length - 1
    if (type === FrameSection.START) {
      if (video.sections[lastIndex].endFrame) {
        dispatch(startSection({ frameNumber }))
        await setBlockCountFrameSection({ type, frameNumber: frameNumber })
      }
    } else if (type === FrameSection.END) {
      dispatch(endSection({ frameNumber }))
      await setBlockCountFrameSection({ type, frameNumber: frameNumber })
      setDisabled(!video.src)
      handleCount(lastIndex)
    }
    setDisabled(!video.src)
  }

  useEffect(() => {
    setDisabled(!video.src)
  }, [video])

  const handleCount = async (index: number) => {
    if (disabled) return
    const response = await getCount({})
    if ('data' in response) {
      dispatch(setCount({ index, ...response.data }))
    } else if ('error' in response) {
      console.log(response.error)
    }
  }

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
        <Button onClick={async () => await handleFrameSection(FrameSection.START)}>
          Start Section
        </Button>
        <Button onClick={async () => await handleFrameSection(FrameSection.END)}>
          Stop Section
        </Button>
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
