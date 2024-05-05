import styled from 'styled-components'

export const FrameSectionContainer = styled.div`
  background-color: rgba(51, 51, 51, 0.9);
  border: 1px solid white;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  margin-top: 10px;
  border-radius: 10px;
  transition-duration: 0.4s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 0.1fr 1fr 1fr 1fr 1fr 1fr; /* First column auto to accommodate index, second column takes up remaining space */
  width: 100%;

  &:hover {
    background-color: #222; /* Darker Gray */
  }
`

export const FrameSectionNumber = styled.div`
  margin-right: 10px;
  padding: 5px 10px;
`

export const FrameSectionDetail = styled.div`
  margin-right: 10px;
  border: 1px solid white;
  padding: 5px 10px;
  border-radius: 5px;
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
export const CheckIconWrapper = styled.div`
  z-index: 10;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &:hover {
    color: #fff; /* Change the color to your desired color */
  }
`
