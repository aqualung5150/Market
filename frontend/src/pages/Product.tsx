import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import { ProductData } from "../types/product";
import ProductImage from "../features/product/components/productDetail/ProductImage";
import ProductTitle from "../features/product/components/productDetail/ProductTitle";
import ProductDescription from "../features/product/components/productDetail/ProductDescription";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { setOpenChat, setSendTo } from "../features/chat/chatSlice";

const Product = () => {
  const paramId = useParams().id;
  const userId = useSelector((state: RootState) => state.user.id);
  const {
    data,
    error,
    loading,
  }: { data: ProductData; error: any; loading: boolean } = useAxios(
    `product/${paramId}`
  );

  const dispatch = useDispatch();

  if (error) alert("상품 정보를 불러올 수 없습니다.");

  return (
    <>
      {loading && <Loading text="로딩중..." />}
      {data && (
        <div className="2xl:w-2/3 h-full w-full flex flex-col gap-10 items-center p-5 bg-white">
          {/* <div className="w-full flex justify-center gap-5 flex-wrap"> */}
          <div className="lg:grid grid-cols-2 flex flex-col gap-10">
            <div className="aspect-square rounded-2xl shadow select-none">
              <ProductImage data={data} />
            </div>
            <div className="flex-1 flex flex-col rounded-2xl gap-2">
              <ProductTitle paramId={paramId} data={data} />
            </div>
          </div>
          <div className="w-full flex flex-col lg:flex-row gap-10">
            <div className="flex-1 min-h-[200px]">
              <div className="text-3xl border-b pb-2">상품정보</div>
              <div className="pt-2">{data.description}</div>
            </div>
            {userId !== data.user.id && (
              <div className="flex-1 min-h-[200px]">
                <div className="text-3xl border-b pb-2">판매자</div>
                <div className="flex justify-between items-center pt-2">
                  <div className="font-bold text-xl">{data.user.nickname}</div>
                  <button
                    className="w-20 h-10 bg-green-300 rounded"
                    onClick={() => {
                      dispatch(setSendTo(data.user.id));
                      dispatch(setOpenChat(true));
                    }}
                  >
                    채팅하기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
