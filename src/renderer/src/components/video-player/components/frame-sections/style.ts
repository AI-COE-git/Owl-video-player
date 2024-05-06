import styled from 'styled-components'

export const FrameSectionsContainer = styled.div`
  width: 100%;
  position: absolute;
  z-index: 1;
  top: 60px;
  display: flex;
  flex-direction: column;
  align-items: start;
`

export const ShowFramesButtons = styled.div`
  position: absolute;
  left: 10px;
  display: flex;
  gap: 10px;
  align-items: center;
`

export const FrameSectionCountDetailContainer = styled.div`
  margin-right: 10px;
  border: 1px solid white;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

export const FramesContainer = styled.div<{ brightness: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: start;
  max-height: 43vh;
  overflow-y: auto;
  width: 100%;
  background-color: ${(props) => (props.brightness ? 'none' : 'rgba(0, 0, 0, 0.8)')};
  position: absolute;
  top: 30px;
`
