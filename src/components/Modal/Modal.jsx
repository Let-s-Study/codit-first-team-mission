import { createPortal } from 'react-dom';
import './Modal.scss';

function Modal({ children, isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="overlay">
      <div className="modal">
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  )
}

export default Modal;