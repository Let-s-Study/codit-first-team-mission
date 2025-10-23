import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

export function Modal({ children, isOpen }) {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  )
}
