import { ReactComponent as CloseIcon } from "../assets/close.svg";

const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      className="fixed z-10 left-0 top-0 bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex flex-col mx-2 bg-white h-[500px] w-[400px] border border-grey rounded shadow-xl"
      >
        <div className="flex items-center justify-end p-4 md:p-5 border-b rounded-t">
          {onClose && <CloseIcon onClick={onClose} className="w-12 h-12" />}
        </div>

        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
