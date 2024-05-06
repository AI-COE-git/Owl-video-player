import React, { useRef } from 'react'
import { VideoContainer } from './style'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { endSection, setCount } from '../../../store/reducers/videoReducer'
import {
  useGetCountMutation,
  useSetBlockCountFrameSectionMutation
} from '../../../store/api-slices/blockCountSlice'
import { FrameSection } from '@renderer/types/enums/frame-section'
import Video from './components/video/video'
import Tasksbar from './components/tasks-bar/tasksBar'

const VideoPlayer: React.FC = () => {
  const dispatch = useAppDispatch()
  const video = useAppSelector((state) => state.video)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [setBlockCountFrameSection] = useSetBlockCountFrameSectionMutation()
  const [getCount] = useGetCountMutation()

  const getCurrentExactFrame = () => {
    if (!video.duration) return 0
    const frameDuration = 1 / video.frames
    const currentTime = videoRef.current?.currentTime || 0
    const currentExactFrame = Math.floor(currentTime / frameDuration)
    return currentExactFrame
  }

  const handleVideoEnd = async () => {
    const frameNumber = getCurrentExactFrame()
    const lastId = video.sections[video.sections.length - 1].id
    dispatch(endSection({ id: lastId, frameNumber }))
    await setBlockCountFrameSection({ type: FrameSection.END, frameNumber: frameNumber })
    handleCount(lastId)
  }

  const handleCount = async (lastId: string) => {
    const response = await getCount({})
    if ('data' in response) {
      dispatch(setCount({ id: lastId, ...response.data }))
    } else if ('error' in response) {
      console.log(response.error)
    }
  }

  return (
    <VideoContainer>
      <Tasksbar />
      {video.src ? (
        <Video
          videoRef={videoRef}
          src={video.src}
          onEnded={handleVideoEnd}
          getCurrentExactFrame={getCurrentExactFrame}
        />
      ) : (
        <p>Please choose a video</p>
      )}
    </VideoContainer>
  )
}

export default VideoPlayer
