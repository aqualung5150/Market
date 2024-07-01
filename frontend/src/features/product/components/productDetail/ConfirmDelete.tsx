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
      <div className="h-full w-full relative flex flex-col items-center">
        <div className="absolute text-2xl text-center top-16">
          삭제하시겠습니까?
        </div>
        <div className="absolute text-xl top-40 w-full flex justify-evenly">
          <button
            onClick={() => deleteProduct()}
            className="bg-green-300 rounded w-24 h-10"
          >
            예
          </button>
          <button
            onClick={() => setOpenConfirmDelete(false)}
            className="bg-red-300 rounded w-24 h-10"
          >
            아니오
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDelete;
