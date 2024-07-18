import SendButton from "features/chat/components/SendButton";
import { SellerInfoProps } from "types/product";

const SellerInfo = ({ seller }: SellerInfoProps) => {
  return (
    <div className="min-h-[200px] w-full flex-1">
      <div className="border-b pb-2 text-3xl">판매자</div>
      <div className="flex w-full items-center gap-2 pt-2">
        <span className="text-xl font-bold">{seller.nickname}</span>
        <span className="flex-1 text-gray-500">#{seller.id}</span>
        <SendButton
          className="h-10 w-20 rounded bg-green-500 font-bold text-white"
          text="채팅하기"
          sendTo={seller.id}
        />
      </div>
    </div>
  );
};

export default SellerInfo;
