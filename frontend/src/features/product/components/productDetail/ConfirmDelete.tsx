import { useCallback } from "react";
import { axiosInstance } from "../../../../data/axiosInstance";
import { useNavigate } from "react-router-dom";
import Modal from "../../../../components/Modal";
import { ConfirmDelteProps } from "../../../../types/product";

const ConfirmDelete = ({
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
            className="h-10 w-24 rounded bg-green-300"
          >
            예
          </button>
          <button
            onClick={() => setOpenConfirmDelete(false)}
            className="h-10 w-24 rounded bg-red-300"
          >
            아니오
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDelete;
