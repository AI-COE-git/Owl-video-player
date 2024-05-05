import styled from 'styled-components'

export const FrameSectionsContainer = styled.div`
  width: 100%;
  position: absolute;
  z-index: 1;
  top: 60px;
  left: 10px;
  display: flex;
  flex-direction: column;
  align-items: start;
`

export const Button = styled.button`
  background-color: rgba(51, 51, 51, 0.9);
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;
  cursor: pointer;
  transition-duration: 0.4s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #222; /* Darker Gray */
  }
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

export const FramesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  max-height: 43vh;
  overflow-y: auto;
  width: 100%;
`
