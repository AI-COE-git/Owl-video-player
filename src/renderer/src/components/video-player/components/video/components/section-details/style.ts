import styled from 'styled-components'

export const SectionDetailsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  opacity: 0.2;
  transition: opacity 0.4s;
  padding: 15px;
  position: relative;

  &:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.8);
  }
`

export const SectionDetailsData = styled.div`
  display: flex;
  width: 97%;
`

export const FrameSectionDetail = styled.div`
  margin-right: 10px;
  border: 1px solid white;
  padding: 5px 10px;
  border-radius: 5px;
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

export const FrameSectionInput = styled.input`
  margin-right: 10px;
  border: 1px solid white;
  border-radius: 5px;
`

export const AngleButton = styled.button`
  color: rgba(51, 51, 51, 0.9);
  border: 1px solid white;
  background-color: white;
  padding: 10px 20px;
  margin-right: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;
  cursor: pointer;
  transition-duration: 0.4s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #222; /* Darker Gray */
    color: white;
  }
`

export const IconWrapper = styled.div`
  z-index: 10;
  cursor: pointer;
  width: 3%;

  &:hover {
    color: #fff; /* Change the color to your desired color */
  }
`

export const CheckIconWrapper = styled.div`
  z-index: 10;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &:hover {
    color: #fff; /* Change the color to your desired color */
  }
`
