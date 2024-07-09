import { RootState } from "app/store";
import { setOpenChat, setSendTo } from "features/chat/chatSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductDescriptionProps } from "types/product";

const ProductDescription = ({ data }: ProductDescriptionProps) => {
  const userId = useSelector((state: RootState) => state.user.id);
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex min-h-[500px] flex-1 flex-col p-4">
        <div className="text-3xl">상품정보</div>
        <div>{data.description}</div>
      </div>
      {userId !== data.user.id && (
        <div className="min-h-[500px] flex-1 border-l p-4">
          <div className="text-3xl">판매자</div>
          <div className="text-xl font-bold">{data.user.nickname}</div>
          <button
            className="h-[50px] w-[100px] rounded bg-green-300"
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
