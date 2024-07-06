import { ReactComponent as CloseIcon } from "../assets/close.svg";

const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="border-grey mx-2 flex h-[500px] w-[400px] flex-col rounded border bg-white shadow-xl"
      >
        <div className="flex items-center justify-end rounded-t border-b p-4 md:p-5">
          {onClose && <CloseIcon onClick={onClose} className="h-12 w-12" />}
        </div>

        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
