import SendButton from "../../../chat/components/SendButton";

const SellerInfo = ({ seller }: any) => {
  return (
    <div className="min-h-[200px] flex-1">
      <div className="border-b pb-2 text-3xl">판매자</div>
      <div className="flex items-center justify-between pt-2">
        <div className="text-xl font-bold">{seller.nickname}</div>
        <SendButton
          className="h-10 w-20 rounded bg-green-300"
          text="채팅하기"
          sendTo={seller.id}
        />
      </div>
    </div>
  );
};

export default SellerInfo;
