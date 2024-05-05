import React, { useState, useEffect } from 'react'
import {
  FaPlay,
  FaPause,
  FaExpand,
  FaCompress,
  FaCamera,
  FaUndo,
  FaRedo,
  FaPlusCircle,
  FaMinusCircle,
  FaChevronCircleLeft,
  FaChevronCircleRight
} from 'react-icons/fa'
import { RiExpandUpDownFill } from 'react-icons/ri'
import { TbKeyframes } from 'react-icons/tb'

import {
  ControlsContainer,
  InnerBar,
  Timeline,
  Bar,
  IconsContainer,
  TimeDisplay,
  IconWrapper,
  DropdownContainer,
  Dropdown,
  Option
} from './style'
import { useAppDispatch, useAppSelector } from '../../../../../../../store/store'
import {
  endSection,
  setCount,
  setFrameRate,
  setIsPlaying,
  setIsSectionRun,
  setShowSectionDetails,
  startSection
} from '../../../../../../../store/reducers/videoReducer'
import { FrameSection } from '@renderer/types/enums/frame-section'
import {
  useGetCountMutation,
  useSetBlockCountFrameSectionMutation
} from '../../../../../../../store/api-slices/blockCountSlice'
import { startSectionKeys, stopSectionKeys } from '../../../tasks-bar/helpers'
import SnapshotPreview from '../snapshot-preview/SnapshotPreview'

interface ControlsProps {
  videoRef: React.RefObject<HTMLVideoElement>
  getCurrentExactFrame: () => number
}

const Controls: React.FC<ControlsProps> = ({ videoRef, getCurrentExactFrame }) => {
  const dispatch = useAppDispatch()
  const isPlaying = useAppSelector((state) => state.video.isPlaying)
  const videoDuration = useAppSelector((state) => state.video.duration)
  const showSectionDetails = useAppSelector((state) => state.video.showSectionDetails)
  const sections = useAppSelector((state) => state.video.sections)
  const isSectionRun = useAppSelector((state) => state.video.isSectionRun)
  const frameRate = useAppSelector((state) => state.video.frameRate)
  const frames = useAppSelector((state) => state.video.frames)

  const [getCount] = useGetCountMutation()
  const [setBlockCountFrameSection] = useSetBlockCountFrameSectionMutation()

  const [snapshotDataUrl, setSnapshotDataUrl] = useState<string>()

  const [progress, setProgress] = useState('0%')
  const [currentTime, setCurrentTime] = useState('0:00')
  const [duration, setDuration] = useState('0:00')
  const [showControls, setShowControls] = useState(true) // State to toggle visibility of controls

  const [frameRateIsOpen, setFrameRateIsOpen] = useState(false)
  const [fullScreenMode, setFullScreenMode] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const curr = (video.currentTime / video.duration) * 100
    setProgress(`${curr}%`)
    setCurrentTime(formatTime(video.currentTime))
    setDuration(formatTime(videoDuration as number))
    if (video.ended) {
      dispatch(setIsPlaying(false))
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current

    const handleTimeUpdate = () => {
      if (!video) return

      const curr = (video.currentTime / video.duration) * 100
      setProgress(`${curr}%`)
      setCurrentTime(formatTime(video.currentTime))
      setDuration(formatTime(videoDuration as number))
      if (video.ended) {
        dispatch(setIsPlaying(false))
      }
    }

    video?.addEventListener('timeupdate', handleTimeUpdate)

    const handleKeyDown = async (event: KeyboardEvent) => {
      if (startSectionKeys.includes(event.key)) {
        await handleFrameSection(FrameSection.START)
      } else if (stopSectionKeys.includes(event.key)) {
        await handleFrameSection(FrameSection.END)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      video?.removeEventListener('timeupdate', handleTimeUpdate)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [videoRef])

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const playPause = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play()
      dispatch(setIsPlaying(true))
    } else {
      video.pause()
      dispatch(setIsPlaying(false))
    }
  }

  const fullScreen = () => {
    const video = videoRef.current
    if (!video) return

    if (fullScreenMode) {
      video.style.width = 'auto'
      video.style.height = 'auto'
    } else {
      video.style.width = '100vw'
      video.style.height = '100vh'
    }

    setFullScreenMode((prev) => !prev)
  }

  const getSnapshotDataURL = () => {
    const video = videoRef.current
    if (!video) return

    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    const snapshotDataURL = canvas.toDataURL('image/png')
    // You can use 'image' to display the screenshot or perform any other action
    return snapshotDataURL
  }

  const takeScreenshot = () => {
    const snapshotDataURL = getSnapshotDataURL()
    setSnapshotDataUrl(snapshotDataURL)
  }

  const rewind = () => {
    const video = videoRef.current
    if (!video) return

    video.currentTime -= (video.duration / 100) * 5
  }

  const forward = () => {
    const video = videoRef.current
    if (!video) return

    video.currentTime += (video.duration / 100) * 5
  }

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget
    const video = videoRef.current
    if (!video || !bar) return

    const clickX = e.clientX - bar.getBoundingClientRect().left
    const percent = clickX / bar.offsetWidth
    const newTime = percent * video.duration
    video.currentTime = newTime
  }

  const handleFrameSection = async (type: FrameSection) => {
    const frameNumber = getCurrentExactFrame()
    const lastIndex = sections.length - 1
    const { id } = sections[lastIndex]
    if (type === FrameSection.START) {
      dispatch(setIsSectionRun(true))
      if (sections[lastIndex].endFrame) {
        dispatch(startSection({ frameNumber }))
        await setBlockCountFrameSection({ type, frameNumber: frameNumber })
      }
    } else if (type === FrameSection.END) {
      dispatch(setIsSectionRun(false))
      dispatch(endSection({ id, frameNumber }))
      const video = videoRef.current
      if (!video) return
      video.pause()
      dispatch(setIsPlaying(false))
      await setBlockCountFrameSection({ type, frameNumber: frameNumber })
      handleCount(id)
    }
  }

  const handleCount = async (id: string) => {
    const response = await getCount({})
    if ('data' in response) {
      dispatch(setCount({ id, ...response.data }))
    } else if ('error' in response) {
      console.log(response.error)
    }
  }

  const handleShowSectionDetails = () => {
    dispatch(setShowSectionDetails(!showSectionDetails))
  }

  const handleFrameRateChange = (event) => {
    const newFramerate = parseInt(event.target.value)
    setFrameRateIsOpen(false)
    dispatch(setFrameRate(newFramerate))
  }

  return (
    <ControlsContainer>
      <IconsContainer>
        <IconWrapper>
          {isPlaying ? <FaPause onClick={playPause} /> : <FaPlay onClick={playPause} />}
        </IconWrapper>
      </IconsContainer>
      <Timeline>
        <Bar onClick={handleBarClick}>
          <InnerBar progress={progress} />
          <TimeDisplay progress={progress}>
            {currentTime} / {duration}
          </TimeDisplay>
        </Bar>
      </Timeline>
      <IconsContainer>
        {showControls && (
          <>
            <IconWrapper>
              {isSectionRun ? (
                <FaMinusCircle onClick={async () => await handleFrameSection(FrameSection.END)} />
              ) : (
                <FaPlusCircle onClick={async () => await handleFrameSection(FrameSection.START)} />
              )}
            </IconWrapper>
            <IconWrapper>
              <TbKeyframes onClick={() => setFrameRateIsOpen((prev) => !prev)} />
              <DropdownContainer open={frameRateIsOpen}>
                <Dropdown value={frameRate} onChange={handleFrameRateChange}>
                  {[...Array(frames).keys()].map((frame) => (
                    <Option key={frame + 1} value={frame + 1}>
                      {frame + 1} FPS
                    </Option>
                  ))}
                </Dropdown>
              </DropdownContainer>
            </IconWrapper>

            <IconWrapper>
              <FaCamera onClick={takeScreenshot} />
            </IconWrapper>
            <IconWrapper>
              <FaUndo onClick={rewind} />
            </IconWrapper>
            <IconWrapper>
              <FaRedo onClick={forward} />
            </IconWrapper>
            <IconWrapper>
              {fullScreenMode ? (
                <FaCompress onClick={fullScreen} />
              ) : (
                <FaExpand onClick={fullScreen} />
              )}
            </IconWrapper>
          </>
        )}
        <IconWrapper onClick={() => setShowControls(!showControls)}>
          {showControls ? <FaChevronCircleRight /> : <FaChevronCircleLeft />}
        </IconWrapper>
        <IconWrapper>
          <RiExpandUpDownFill onClick={handleShowSectionDetails} />
        </IconWrapper>
      </IconsContainer>

      {snapshotDataUrl && (
        <SnapshotPreview
          snapshotDataURL={snapshotDataUrl}
          setSnapshotDataUrl={setSnapshotDataUrl}
        />
      )}
    </ControlsContainer>
  )
}

export default Controls
