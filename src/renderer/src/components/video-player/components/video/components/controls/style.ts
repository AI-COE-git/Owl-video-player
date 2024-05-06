import styled from 'styled-components'

export const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  opacity: 0.2;
  transition: opacity 0.4s;
  width: 100%;
  padding: 15px;

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
  border-right: 3px solid black;
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

export const HiddenIconsContainer = styled.div<{ open: boolean }>`
  display: flex;
  gap: 10px;
`

export const DropdownContainer = styled.div<{ open: boolean }>`
  position: absolute;
  bottom: calc(100% + 5px); /* Adjust the distance between the icon and the dropdown container */
  left: 50%; /* Position it in the horizontal center */
  transform: translateX(-50%); /* Move it back by half of its width to center it */
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.8);
  display: ${({ open }) => (open ? 'block' : 'none')};
`

export const Dropdown = styled.select`
  background-color: rgba(0, 0, 0, 0.8);
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-family: Tahoma, sans-serif;
`

export const Option = styled.option`
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`
