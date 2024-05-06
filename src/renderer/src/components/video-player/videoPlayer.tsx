import React, { useRef } from 'react'
import { VideoContainer } from './style'
import { useAppSelector } from '../../../store/store'
import Video from './components/video/video'
import Tasksbar from './components/tasks-bar/tasksBar'

const VideoPlayer: React.FC = () => {
  const src = useAppSelector((state) => state.video.src)
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <VideoContainer>
      <Tasksbar />
      {src ? <Video videoRef={videoRef} src={src} /> : <p>Please choose a video</p>}
    </VideoContainer>
  )
}

export default VideoPlayer
