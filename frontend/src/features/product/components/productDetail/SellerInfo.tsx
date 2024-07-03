import SendButton from "../../../chat/components/SendButton";

const SellerInfo = ({ seller }: any) => {
  return (
    <div className="flex-1 min-h-[200px]">
      <div className="text-3xl border-b pb-2">판매자</div>
      <div className="flex justify-between items-center pt-2">
        <div className="font-bold text-xl">{seller.nickname}</div>
        <SendButton
          className="w-20 h-10 bg-green-300 rounded"
          text="채팅하기"
          sendTo={seller.id}
        />
      </div>
    </div>
  );
};

export default SellerInfo;
