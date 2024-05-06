import { IconWrapper } from '../../../../../shared/components/icon/style'
import { CloseButton, ModalBackground, ModalContent } from './style'
import { IoIosCloseCircleOutline } from 'react-icons/io'

const Modal = ({ closeModal, children }) => {
  return (
    <ModalBackground className="modal">
      <ModalContent>
        <CloseButton>
          <IconWrapper>
            <IoIosCloseCircleOutline onClick={closeModal} />
          </IconWrapper>
        </CloseButton>
        {children}
      </ModalContent>
    </ModalBackground>
  )
}

export default Modal
