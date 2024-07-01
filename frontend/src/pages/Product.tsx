import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import { ProductData } from "../types/product";
import ProductImage from "../features/product/components/productDetail/ProductImage";
import ProductTitle from "../features/product/components/productDetail/ProductTitle";
import ProductDescription from "../features/product/components/productDetail/ProductDescription";

const Product = () => {
  const paramId = useParams().id;
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
      {data && (
        <div className="h-full w-full flex flex-col items-center">
          <div className="m-4 w-3/4 h-1/4 flex justify-center">
            <div className="my-4 mr-4 aspect-square min-w-[200px] min-h-[200px] h-full rounded-2xl shadow-xl select-none">
              <ProductImage data={data} />
            </div>
            <div className="border p-4 my-4 min-w-[200px] min-h-[200px] h-full flex-1 flex flex-col rounded-2xl">
              <ProductTitle paramId={paramId} data={data} />
            </div>
          </div>
          <div className="flex mt-4 w-3/4 justify-center border rounded-2xl">
            <ProductDescription data={data} />
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
