import React from 'react';
import { createPortal } from 'react-dom';
import styles from './index.module.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modal__overlay} onClick={onClose}>
      <div 
        className={styles.modal__content} 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className={styles.modal__close} 
          onClick={onClose}
          aria-label="Закрыть"
        >
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};