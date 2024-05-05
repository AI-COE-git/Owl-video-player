import { CloseButton, ModalBackground, ModalContent } from './style'
import closeIcon from '../../../../../assets/images/close-icon.svg'

const Modal = ({ closeModal, children }) => {
  return (
    <ModalBackground>
      <ModalContent>
        <CloseButton src={closeIcon} alt="Close" onClick={closeModal} />
        {children}
      </ModalContent>
    </ModalBackground>
  )
}

export default Modal
