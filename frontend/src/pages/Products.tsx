import { Link, useParams, useSearchParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import { ProductData } from "../types/product";
import timeAgo from "../utils/timeAgo";

const Products = () => {
  console.log("Products");
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const page = searchParams.get("page");
  const title = useParams().title;

  const {
    data,
    error,
    loading,
  }: { data: ProductData[]; error: any; loading: boolean } = useAxios(
    `search/${title}?categoryId=${categoryId}&page=${page}`
  );

  return (
    <>
      {loading && <Loading text="로딩중..." />}
      {error && <div>상품 정보를 불러오지 못했습니다.</div>}
      {!loading && (
        <div className="2xl:w-2/3 h-full grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 auto-rows-min  gap-5 p-5">
          {data?.map((product: ProductData) => (
            <div
              key={product.id}
              className="bg-white aspect-[3/4] flex flex-col w-full rounded-lg shadow-lg cursor-pointer"
            >
              <Link className="h-fit" to={`/product/${product.id}`}>
                <img
                  className="aspect-square rounded-t-lg object-cover"
                  src={`${process.env.REACT_APP_API_URL}/product/productImage/${
                    product.images.find((e) => e.main)?.url
                  }`}
                />
              </Link>
              <div className="flex-1 w-full justify-between flex flex-col p-2">
                <div className="text-lg font-semibold">{product?.title}</div>
                <div className="font-semibold">
                  {product?.price.toLocaleString()}원
                </div>
                <div className="text-sm text-gray-700">
                  {timeAgo(new Date(product.createdAt))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Products;
