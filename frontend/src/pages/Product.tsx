import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SellerInfo from "features/product/components/productDetail/SellerInfo";
import { RootState } from "app/store";
import ProductStatusContext from "features/product/context/ProductStatusContext";
import useAxios from "hooks/useAxios";
import { ProductData } from "types/product";
import Loading from "components/Loading";
import ProductImage from "features/product/components/productDetail/ProductImage";
import ProductTitle from "features/product/components/productDetail/ProductTitle";
import NotFound from "components/NotFound";

const Product = () => {
  const paramId = useParams().id;
  const userId = useSelector((state: RootState) => state.user.id);
  const {
    data,
    error,
    loading,
  }: { data: ProductData; error: any; loading: boolean } = useAxios(
    `product/${paramId}`,
  );
  const [status, setStatus] = useState<number>(0);

  useEffect(() => {
    if (data) setStatus(data.status);
  }, [data]);

  return (
    <>
      {loading && <Loading text="로딩중..." />}
      {error && <NotFound title="상품 정보를 불러올 수 없습니다." />}
      {data && (
        <div className="flex h-full w-full flex-col items-center gap-10 bg-white p-5 2xl:w-2/3">
          <div className="flex grid-cols-2 flex-col gap-10 lg:grid">
            <ProductStatusContext.Provider value={{ status, setStatus }}>
              <div className="aspect-square select-none rounded-2xl shadow">
                <ProductImage data={data} />
              </div>
              <div className="flex flex-1 flex-col gap-2 rounded-2xl">
                <ProductTitle paramId={paramId} data={data} />
              </div>
            </ProductStatusContext.Provider>
          </div>
          <div className="flex w-full flex-col gap-10 lg:flex-row">
            <div className="min-h-[200px] flex-1">
              <div className="border-b pb-2 text-3xl">상품정보</div>
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
