import styled, { css } from 'styled-components'

interface ButtonsSectionProps {
  disabled: boolean
}

export const TaskbarContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
`

export const FileInput = styled.input`
  background-color: rgba(51, 51, 51, 0.9);
  color: white;
  border: none;
  cursor: pointer;
`

export const FrameButtonRight = styled.button`
  background-color: rgba(51, 51, 51, 0.9);
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition-duration: 0.4s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #222; /* Darker Gray */
  }
`

export const FrameButtonLeft = styled.button`
  background-color: rgba(51, 51, 51, 0.9);
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition-duration: 0.4s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #222; /* Darker Gray */
  }
`

export const Button = styled.button`
  background-color: rgba(51, 51, 51, 0.9);
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 0 10px;
  border-radius: 5px;
  cursor: pointer;
  transition-duration: 0.4s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #222; /* Darker Gray */
  }
`

export const StyledFrameSection = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(51, 51, 51, 0.9);
  border-radius: 5px;
`

export const StyledSpan = styled.span`
  color: white;
`

export const ButtonsSection = styled.div<ButtonsSectionProps>`
  margin-left: auto;
  margin-right: 10px;
  display: flex;
  align-items: center;

  ${({ disabled }) =>
    disabled &&
    css`
      & button {
        /* styles for disabled button */
        /* Example: */
        opacity: 0.5;
        cursor: not-allowed;
      }
    `}
`
