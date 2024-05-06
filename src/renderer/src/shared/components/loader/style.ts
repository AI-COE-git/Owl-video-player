import styled from 'styled-components'

export const Spinner = styled.div`
  border: 0.2em solid white;
  border-top: 0.2em black solid;
  border-radius: 50%;
  height: 1em;
  width: 1em;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`
