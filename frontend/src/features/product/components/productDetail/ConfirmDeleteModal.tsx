import Modal from "components/Modal";
import { axiosInstance } from "data/axiosInstance";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmDelteProps } from "types/product";

const ConfirmDeleteModal = ({
  paramId,
  category,
  openConfirmDelete,
  setOpenConfirmDelete,
}: ConfirmDelteProps) => {
  const navigate = useNavigate();

  const deleteProduct = useCallback(async () => {
    try {
      await axiosInstance.delete(`/product/${paramId}`);
      alert("상품을 삭제했습니다.");
      navigate(`/search?category=${category?.id}&page=1`);
    } catch (err: any) {
      alert(`상품 삭제에 실패했습니다. - ${err.message}`);
    }
  }, [paramId]);

  return (
    <Modal open={openConfirmDelete} onClose={() => setOpenConfirmDelete(false)}>
      <div className="relative flex h-full w-full flex-col items-center">
        <div className="absolute top-16 text-center text-2xl">
          삭제하시겠습니까?
        </div>
        <div className="absolute top-40 flex w-full justify-evenly text-xl">
          <button
            onClick={() => deleteProduct()}
            className="mb-2 h-14 w-28 rounded-md bg-green-500 text-base font-semibold text-white"
          >
            예
          </button>
          <button
            onClick={() => setOpenConfirmDelete(false)}
            className="mb-2 h-14 w-28 rounded-md bg-red-500 text-base font-semibold text-white"
          >
            아니오
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
