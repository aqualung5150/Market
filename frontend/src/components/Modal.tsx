import { useNavigate } from "react-router-dom";

const Modal = ({ open, onClose, children }: ModalProps) => {
  const navigate = useNavigate();
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
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          {onClose ? (
            <>
              <div></div>
              <p className="" onClick={onClose}>
                X
              </p>
            </>
          ) : (
            <>
              <p onClick={() => navigate("/")}>Home</p>
              <p onClick={() => navigate(-1)}>Back</p>
            </>
          )}
        </div>

        <div className="h-full w-full">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
