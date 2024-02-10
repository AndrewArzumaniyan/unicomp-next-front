import React, { FC } from "react";
import styles from "./Modal.module.scss";

interface ModalProps {
  visible: boolean;
  delVisible: () => void;
  children: React.ReactNode;
  className?: string;
  modalClose?: boolean;
}

const Modal: FC<ModalProps> = ({ visible, delVisible, children, className, modalClose = true }) => {
  return (
    <div onClick={delVisible} className={`${className} ${styles.modal} ${visible ? styles.active : ''}`}>
      <div onClick={(e) => e.stopPropagation()} className="wrapper">
        {children}
        {modalClose ?
          <span onClick={delVisible} className={styles["modal-close"]}></span>
          : ''
        }
      </div>
    </div>
  );
};

export default Modal;