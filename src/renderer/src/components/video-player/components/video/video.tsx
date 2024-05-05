// Video.tsx
import React, { useRef, useEffect, useState } from 'react'
import { Container, StyledVideo } from './style'
import Controls from './components/controls/Controls'

interface VideoProps {
  videoRef: React.RefObject<HTMLVideoElement>
  src: string
  onEnded: () => void
}

const Video: React.FC<VideoProps> = ({ videoRef, src, onEnded }) => {
  useEffect(() => {
    if (videoRef.current && videoRef.current.src !== src) {
      videoRef.current.src = src
    }
  }, [src])

  return (
    <Container>
      <StyledVideo ref={videoRef} onEnded={onEnded}>
        <source src={src} type="video/mp4" />
        <source src={src} type="video/webm" />
        <source src={src} type="video/ogg" />
      </StyledVideo>
      <Controls videoRef={videoRef} />
    </Container>
  )
}

export default Video
