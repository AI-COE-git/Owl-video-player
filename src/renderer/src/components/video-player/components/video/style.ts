import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: flex;
  width: max-content;
  height: max-content;
  justify-content: center;
  align-items: center;
`

export const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const ControlsContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
`
