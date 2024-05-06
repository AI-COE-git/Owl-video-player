import Modal from '../../../shared/Modal/Modal'
import { SnapshotContainer, SnapshotIcons, SnapshotImage } from './style'
import { IconWrapper } from '../../../../../../shared/components/icon/style'
import { CgSoftwareDownload } from 'react-icons/cg'

const SnapshotPreview = ({ snapshotDataURL, setSnapshotDataUrl }) => {
  const closeModal = () => {
    setSnapshotDataUrl()
  }

  const downloadFile = () => {
    const downloadLink = document.createElement('a')
    downloadLink.href = snapshotDataURL
    downloadLink.download = 'screen-shot.png'
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  return (
    <>
      <Modal closeModal={closeModal}>
        <SnapshotIcons>
          <IconWrapper>
            <CgSoftwareDownload onClick={downloadFile} />
          </IconWrapper>
        </SnapshotIcons>
        <SnapshotContainer>
          <SnapshotImage src={snapshotDataURL} alt="Snapshot Preview" />
        </SnapshotContainer>
      </Modal>
    </>
  )
}

export default SnapshotPreview
