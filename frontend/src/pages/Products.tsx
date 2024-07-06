import { useParams, useSearchParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import { ProductData } from "../types/product";
import ProductThumbnail from "../features/product/components/productThumbnail/ProductThumbnail";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const page = searchParams.get("page");
  const title = useParams().title;

  const params = new URLSearchParams();
  if (title) params.append("keyword", title);
  if (categoryId) params.append("categoryId", categoryId.toString());
  params.append("page", page ? page.toString() : "1");

  const url = `search?${params.toString()}`;

  const {
    data,
    error,
    loading,
  }: { data: ProductData[]; error: any; loading: boolean } = useAxios(url);

  return (
    <>
      {loading && <Loading text="로딩중..." />}
      {error && <div>상품 정보를 불러오지 못했습니다.</div>}
      {!loading && data && (
        <div className="2xl:w-2/3 h-full grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 auto-rows-min  gap-5 p-5">
          {data.map((product: ProductData) => (
            <ProductThumbnail key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default Products;
