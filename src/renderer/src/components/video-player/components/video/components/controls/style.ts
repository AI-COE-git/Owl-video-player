import styled from 'styled-components'

export const ControlsContainer = styled.div`
  position: absolute;
  bottom: 0;
  padding: 15px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  opacity: 0.2;
  transition: opacity 0.4s;

  &:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.8);
  }
`

export const Timeline = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  border: none;
  border-right: 3px solid #ccc;
  border-left: 3px solid #ccc;
  margin-left: 20px;
  margin-right: 20px;
`

export const Bar = styled.div`
  background: rgba(255, 255, 255, 0.5);
  height: 4px;
  flex: 1;
  cursor: pointer;
  position: relative;
`

export const InnerBar = styled.div<{ progress: string }>`
  background-color: #ccc;
  height: 100%;
  width: ${(props) => props.progress || '0%'};
`

export const TimeDisplay = styled.div<{ progress: string }>`
  position: absolute;
  bottom: 100%;
  left: ${(props) => props.progress || '0%'};
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
  font-size: 0.8em;
  color: #fff;
`

export const IconsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 10px;
  margin-right: 10px;
`

export const IconWrapper = styled.div`
  cursor: pointer;
  &:hover {
    color: #fff; /* Change the color to your desired color */
  }
`
