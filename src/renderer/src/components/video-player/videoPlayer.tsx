import React, { useEffect, useRef, useState } from 'react'
import { StyledVideo, VideoContainer } from './style'
import Tasksbar from '../tasks-bar/tasksBar'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { endSection, setCount, setNewFile } from '../../../store/reducers/videoReducer'
import { loadVideo, nextFrameKeys, prevFrameKeys } from './helpers'
import { useOpenFileMutation } from '../../../store/api-slices/fileSlice'
import {
  useGetCountMutation,
  useSetBlockCountFrameSectionMutation
} from '../../../store/api-slices/blockCountSlice'
import FrameSections from '../frame-sections/FrameSections'
import { FrameSection } from '@renderer/types/enums/frame-section'

const VideoPlayer: React.FC = () => {
  const dispatch = useAppDispatch()
  const video = useAppSelector((state) => state.video)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [frameRate, setFrameRate] = useState(1)
  const frameRateRef = useRef(frameRate)

  const [openFile] = useOpenFileMutation()
  const [setBlockCountFrameSection] = useSetBlockCountFrameSectionMutation()
  const [getCount] = useGetCountMutation()

  useEffect(() => {
    if (videoRef.current && videoRef.current.src !== video.src) {
      videoRef.current.src = video.src
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [video])

  useEffect(() => {
    frameRateRef.current = frameRate
  }, [frameRate])

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files
    if (fileList && fileList.length > 0) {
      const file = fileList[0]
      const videoElem = await loadVideo(file)
      const fileDetails = {
        src: videoElem.src,
        path: file.path,
        duration: videoElem.duration
      }
      dispatch(setNewFile(fileDetails))
      await openFile(fileDetails)
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!video.duration) return
    const totalFrames = video.duration * video.frames
    const currentExactFrame = getCurrentExactFrame()
    if (!currentExactFrame) return

    if (nextFrameKeys.includes(event.key)) {
      const nextFrame = currentExactFrame + frameRateRef.current
      handleVideoCurrentTime(nextFrame >= totalFrames ? video.duration : nextFrame)
    } else if (prevFrameKeys.includes(event.key)) {
      const prevFrame = currentExactFrame - frameRateRef.current
      handleVideoCurrentTime(prevFrame < 0 ? 0 : prevFrame)
    }
  }

  const handleVideoCurrentTime = (frame: number) => {
    if (videoRef.current) {
      const frameDuration = 1 / video.frames
      videoRef.current.currentTime = frame * frameDuration + 0.00001
    }
  }

  const getCurrentExactFrame = () => {
    if (!video.duration) return 0
    const frameDuration = 1 / video.frames
    const currentTime = videoRef.current?.currentTime || 0
    const currentExactFrame = Math.floor(currentTime / frameDuration)
    return currentExactFrame
  }

  const handleVideoEnd = async () => {
    const frameNumber = getCurrentExactFrame()
    const lastIndex = video.sections.length - 1
    dispatch(endSection({ frameNumber }))
    await setBlockCountFrameSection({ type: FrameSection.END, frameNumber: frameNumber })
    handleCount(lastIndex)
  }

  const handleCount = async (index: number) => {
    const response = await getCount({})
    if ('data' in response) {
      dispatch(setCount({ index, ...response.data }))
    } else if ('error' in response) {
      console.log(response.error)
    }
  }

  return (
    <VideoContainer>
      <Tasksbar
        handleFileInputChange={handleFileInputChange}
        frameRate={frameRate}
        setFrameRate={setFrameRate}
        getCurrentExactFrame={getCurrentExactFrame}
      />
      {videoRef.current?.src && <FrameSections />}

      {video.src ? (
        <StyledVideo ref={videoRef} controls onEnded={async () => await handleVideoEnd()}>
          <source src={video.src} type="video/mp4" />
          <source src={video.src} type="video/webm" />
          <source src={video.src} type="video/ogg" />
        </StyledVideo>
      ) : (
        <p>Please choose a video</p>
      )}
    </VideoContainer>
  )
}

export default VideoPlayer
