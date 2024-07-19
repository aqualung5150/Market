import Modal from "components/Modal";
import { axiosInstance } from "data/axiosInstance";
import ProductStatusContext from "features/product/context/ProductStatusContext";
import { useContext } from "react";
import { SetStatusModalProps } from "types/product";

const SetStatusModal = ({ data, open, setOpen }: SetStatusModalProps) => {
  const status = useContext(ProductStatusContext);

  const updateStatus = async (newStatus: number) => {
    if (newStatus === status.status) return;

    try {
      await axiosInstance.patch(
        `product/status/${data.id}?status=${newStatus}`,
      );
      status.setStatus(newStatus);
    } catch (err) {
      alert(err);
    } finally {
      setOpen(false);
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="flex h-full w-full items-center justify-evenly">
        <button
          onClick={() => updateStatus(0)}
          className="mb-2 h-14 w-28 rounded-md bg-gray-200 text-base font-semibold"
        >
          판매중
        </button>
        <button
          onClick={() => updateStatus(1)}
          className="mb-2 h-14 w-28 rounded-md bg-gray-200 text-base font-semibold"
        >
          판매완료
        </button>
      </div>
    </Modal>
  );
};

export default SetStatusModal;
