import styles from "../styles/Modal.module.css";

const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;
  return (
    <div onClick={onClose} className={styles.overlay}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.container}
      >
        <p onClick={onClose} className={styles.closeBtn}>
          X
        </p>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
