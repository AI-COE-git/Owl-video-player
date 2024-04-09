import { Provider } from 'react-redux'
import VideoPlayer from './components/video-player/videoPlayer'
import { store } from '../store/store'
import styled from 'styled-components'

const StyledApp = styled.div`
  position: relative;
  width: 100%;
`

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <StyledApp>
        <VideoPlayer />
      </StyledApp>
    </Provider>
  )
}

export default App
