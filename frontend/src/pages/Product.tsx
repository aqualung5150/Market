import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import { ProductData } from "../types/product";
import ProductImage from "../features/product/components/productDetail/ProductImage";
import ProductTitle from "../features/product/components/productDetail/ProductTitle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import SellerInfo from "../features/product/components/productDetail/SellerInfo";

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

  if (error) alert("상품 정보를 불러올 수 없습니다.");

  return (
    <>
      {loading && <Loading text="로딩중..." />}
      {error && <div>상품 정보를 불러올 수 없습니다.</div>}
      {data && (
        <div className="2xl:w-2/3 h-full w-full flex flex-col gap-10 items-center p-5 bg-white">
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
            {userId !== data.user.id && <SellerInfo seller={data.user} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
