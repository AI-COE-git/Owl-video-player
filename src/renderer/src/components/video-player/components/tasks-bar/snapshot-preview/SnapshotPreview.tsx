import Modal from '../../shared/Modal/Modal'
import { SnapshotContainer, SnapshotImage } from './style'

const SnapshotPreview = ({ snapshotDataURL, setSnapshotDataUrl }) => {
  const closeModal = () => {
    setSnapshotDataUrl()
  }
  return (
    <>
      <Modal closeModal={closeModal}>
        <SnapshotContainer>
          <SnapshotImage src={snapshotDataURL} alt="Snapshot Preview" />
        </SnapshotContainer>
      </Modal>
    </>
  )
}

export default SnapshotPreview
