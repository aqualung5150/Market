import { useNavigate } from "react-router-dom";
import styles from "./Modal.module.css";

const Modal = ({ open, onClose, children }: ModalProps) => {
  const navigate = useNavigate();
  if (!open) return null;
  return (
    <div onClick={onClose} className={styles.overlay}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.container}
      >
        {onClose ? (
          <p onClick={onClose} className={styles.closeBtn}>
            X
          </p>
        ) : (
          <div>
            <p onClick={() => navigate("/")} className={styles.homeBtn}>
              Home
            </p>
            <p onClick={() => navigate(-1)} className={styles.closeBtn}>
              Back
            </p>
          </div>
        )}

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
