import { VideoSection } from '../../../store/reducers/videoReducer'
import { useAppSelector } from '../../../store/store'
import Tunnel from './components/tunnel/Tunnel'
import { VisualizationContainer } from './style'

function generateRandomSections(count: number): VideoSection[] {
  const sections: VideoSection[] = []

  for (let i = 0; i < count; i++) {
    const id = `${i + 1}`
    const startFrame = i * 100
    const endFrame = startFrame + 100
    const count = Math.floor(Math.random() * 201) // Random count between 0 and 200
    const angle = Math.random() * 350 // Random angle between 0 and 360

    sections.push({ id, startFrame, endFrame, count, angle })
  }

  return sections
}

const Visualization: React.FC = () => {
  const sections = useAppSelector((state) => state.video.sections)
  // const mockSections = [
  //   { id: '1', startFrame: 0, endFrame: 100, count: 20, angle: 45 },
  //   { id: '2', startFrame: 100, endFrame: 200, count: 15, angle: 330 },
  //   { id: '3', startFrame: 200, endFrame: 300, count: 25, angle: 60 },
  //   { id: '4', startFrame: 300, endFrame: 400, count: 18, angle: 315 },
  //   { id: '5', startFrame: 400, endFrame: 500, count: 22, angle: 90 },
  //   { id: '6', startFrame: 500, endFrame: 600, count: 30, angle: 300 },
  //   { id: '7', startFrame: 600, endFrame: 700, count: 15, angle: 45 },
  //   { id: '8', startFrame: 700, endFrame: 800, count: 20, angle: 330 },
  //   { id: '9', startFrame: 800, endFrame: 900, count: 25, angle: 60 },
  //   { id: '10', startFrame: 900, count: 18, angle: 315 }
  // ]

  const mockSections = generateRandomSections(10)
  return (
    <VisualizationContainer>
      <Tunnel sections={mockSections} />
    </VisualizationContainer>
  )
}

export default Visualization
