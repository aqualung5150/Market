import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { setOpenChat, setSendTo } from "../../../chat/chatSlice";
import { ProductDescriptionProps } from "../../../../types/product";

const ProductDescription = ({ data }: ProductDescriptionProps) => {
  const userId = useSelector((state: RootState) => state.user.id);
  const dispatch = useDispatch();
  return (
    <>
      <div className="p-4 min-h-[500px] flex-1 flex flex-col">
        <div className="text-3xl">상품정보</div>
        <div>{data.description}</div>
      </div>
      {userId !== data.user.id && (
        <div className="border-l p-4 min-h-[500px] flex-1">
          <div className="text-3xl">판매자</div>
          <div className="font-bold text-xl">{data.user.nickname}</div>
          <button
            className="w-[100px] h-[50px] bg-green-300 rounded"
            onClick={() => {
              dispatch(setSendTo(data.user.id));
              dispatch(setOpenChat(true));
            }}
          >
            채팅하기
          </button>
        </div>
      )}
    </>
  );
};

export default React.memo(ProductDescription);
