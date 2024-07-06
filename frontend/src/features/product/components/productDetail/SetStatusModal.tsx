import { useContext } from "react";
import Modal from "../../../../components/Modal";
import { axiosInstance } from "../../../../data/axiosInstance";
import ProductStatusContext from "../../context/ProductStatusContext";
import { SetStatusModalProps } from "../../../../types/product";

const SetStatusModal = ({
  data,
  openSetStatus,
  setOpenSetStatus,
}: SetStatusModalProps) => {
  const status = useContext(ProductStatusContext);

  const updateStatus = async (newStatus: number) => {
    if (newStatus === status.status) return;

    try {
      await axiosInstance.patch(
        `product/status/${data.id}?status=${newStatus}`
      );
      status.setStatus(newStatus);
    } catch (err) {
      alert(err);
    } finally {
      setOpenSetStatus(false);
    }
  };

  return (
    <Modal open={openSetStatus} onClose={() => setOpenSetStatus(false)}>
      <div>
        <button onClick={() => updateStatus(0)} className="bg-gray-300 rounded">
          판매중
        </button>
        <button onClick={() => updateStatus(1)} className="bg-gray-300 rounded">
          판매완료
        </button>
      </div>
    </Modal>
  );
};

export default SetStatusModal;
