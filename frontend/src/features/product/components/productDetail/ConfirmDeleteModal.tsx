import Modal from "components/Modal";
import { axiosInstance } from "data/axiosInstance";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ConfirmDelteProps } from "types/product";

const ConfirmDeleteModal = ({ data, open, setOpen }: ConfirmDelteProps) => {
  const navigate = useNavigate();

  const deleteProduct = useCallback(async () => {
    try {
      await axiosInstance.delete(`/product/${data.id}`);
      alert("상품을 삭제했습니다.");
      navigate(`/search?category=${data.categoryId}&page=1`);
    } catch (err: any) {
      alert(`상품 삭제에 실패했습니다. - ${err.message}`);
    }
  }, [data]);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className="flex h-full w-full flex-col items-center justify-center gap-14">
        <h1 className="">삭제하시겠습니까?</h1>
        <div className="flex w-full items-center justify-center gap-14 text-xl">
          <button
            onClick={() => deleteProduct()}
            className="button-green h-14 w-28"
          >
            예
          </button>
          <button
            onClick={() => setOpen(false)}
            className="button-red h-14 w-28"
          >
            아니오
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
