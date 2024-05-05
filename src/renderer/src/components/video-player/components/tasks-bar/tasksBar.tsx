import { useAppDispatch, useAppSelector } from '../../../../../store/store'
import { FileInput, TaskbarContainer } from './style'
import { FrameRateAction } from '../../../../types/enums/frame-rate-action'
import { useEffect, useState } from 'react'
import { setFrameRate } from '../../../../../store/reducers/videoReducer'

type Props = {
  handleFileInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Tasksbar: React.FC<Props> = ({ handleFileInputChange }) => {
  const video = useAppSelector((state) => state.video)
  const frameRate = useAppSelector((state) => state.video.frameRate)
  const [disabled, setDisabled] = useState<boolean>(!video.src)

  const dispatch = useAppDispatch()
  useEffect(() => {
    setDisabled(!video.src)
  }, [video])

  const handleFrameRate = (action: FrameRateAction) => {
    if (disabled) return

    let newFrameRate = frameRate
    if (action === FrameRateAction.INCREMENT && frameRate !== video.frames) {
      newFrameRate = frameRate + 1
    } else if (action === FrameRateAction.DECREMENT && frameRate !== 1) {
      newFrameRate = frameRate - 1
    }

    dispatch(setFrameRate(newFrameRate))
  }

  return (
    <TaskbarContainer>
      <FileInput
        id="fileInput"
        type="file"
        accept="video/mp4, video/webm, video/ogg"
        onChange={handleFileInputChange}
      />
    </TaskbarContainer>
  )
}

export default Tasksbar
