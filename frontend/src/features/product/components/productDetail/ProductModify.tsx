import { useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { CategoryData, ProductData } from "types/product";
import SetStatusModal from "./SetStatusModal";

const ProductModify = ({ data }: { data: ProductData }) => {
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [openSetStatus, setOpenSetStatus] = useState(false);
  return (
    <div className="flex h-16 cursor-pointer rounded-2xl bg-gray-200 shadow-sm">
      <button
        onClick={() => setOpenSetStatus(true)}
        className="flex-1 border-r border-gray-300"
      >
        상태변경
      </button>
      <Link
        className="flex-1 border-r border-gray-300"
        to={`/product/form?type=modify&productId=${data.id}`}
      >
        <button className="h-full w-full">수정하기</button>
      </Link>
      <button onClick={() => setOpenConfirmDelete(true)} className="flex-1">
        삭제하기
      </button>
      <SetStatusModal
        data={data}
        open={openSetStatus}
        setOpen={setOpenSetStatus}
      />
      <ConfirmDeleteModal
        data={data}
        open={openConfirmDelete}
        setOpen={setOpenConfirmDelete}
      />
    </div>
  );
};

export default ProductModify;
