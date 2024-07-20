import NotFound from "components/NotFound";
import { axiosInstance } from "data/axiosInstance";
import ProductThumbnail from "features/product/components/productThumbnail/ProductThumbnail";
import { useEffect, useState } from "react";
import { ProductData } from "types/product";

const ProfileProducts = ({ paramId }: any) => {
  const [status, setStatus] = useState(0); // 0: 전체, 1: 판매중, 2: 판매완료
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `search?page=${page}&userId=${paramId}`,
        );
        setProducts((prev) => prev.concat(res.data.products));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [page]);

  if (error) return <NotFound title="상품 정보를 불러올 수 없습니다." />;
  if (products)
    return (
      <>
        {products.length > 0 ? (
          <div className="flex w-full flex-col">
            <h1 className="font-bold">판매상품</h1>
            <ul className="flex items-center border-b">
              <li
                onClick={() => setStatus(0)}
                className={`w-32 cursor-pointer p-5 text-center ${status === 0 && "border-b-2 border-black font-semibold"}`}
              >
                전체
              </li>
              <li
                onClick={() => setStatus(1)}
                className={`w-32 cursor-pointer p-5 text-center ${status === 1 && "border-b-2 border-black font-semibold"}`}
              >
                판매중
              </li>
              <li
                onClick={() => setStatus(2)}
                className={`w-32 cursor-pointer p-5 text-center ${status === 2 && "border-b-2 border-black font-semibold"}`}
              >
                판매완료
              </li>
            </ul>
            <div className="grid grid-cols-2 gap-5 py-5 sm:grid-cols-3 xl:grid-cols-4">
              {status === 0 &&
                products.map((product) => (
                  <ProductThumbnail key={product.id} product={product} />
                ))}
              {status === 1 &&
                products
                  .filter((product) => product.status === 0)
                  .map((product) => (
                    <ProductThumbnail key={product.id} product={product} />
                  ))}
              {status === 2 &&
                products
                  .filter((product) => product.status === 1)
                  .map((product) => (
                    <ProductThumbnail key={product.id} product={product} />
                  ))}
            </div>
            <button
              onClick={() => setPage(page + 1)}
              className="button-black flex h-14 w-28 items-center justify-center gap-1 self-center"
            >
              {loading && (
                <p className="h-4 w-4 animate-spin rounded-full border-2 border-white border-b-transparent" />
              )}
              <span>더보기</span>
            </button>
          </div>
        ) : (
          <NotFound title="판매중인 상품이 없습니다." />
        )}
      </>
    );
  return null;
};

export default ProfileProducts;
