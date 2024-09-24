// Modal.tsx
import React from "react";
import styles from "../style/Home.module.css";

interface ModalProps {
  isVisible: boolean;
  message: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isVisible, message, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Modal;
