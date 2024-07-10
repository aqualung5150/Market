import { useParams, useSearchParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import { ProductData } from "../types/product";
import ProductThumbnail from "../features/product/components/productThumbnail/ProductThumbnail";
import { useEffect, useState } from "react";
import ProductPagination from "features/product/components/search/ProductPagination";
import NotFound from "components/NotFound";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const page = searchParams.get("page");
  const title = useParams().title;
  const params = new URLSearchParams();
  if (title) params.append("keyword", title);
  if (categoryId) params.append("categoryId", categoryId);
  params.append("page", page ? page : "1");
  const url = `search?${params.toString()}`;

  const { data, error, loading } = useAxios(url);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    if (!data) return;
    setTotalSize(data.totalSize);
    setProducts(data.products);
  }, [data]);

  return (
    <>
      {loading && <Loading text="로딩중..." />}
      {error && (
        <NotFound
          title="상품 정보를 불러오지 못했습니다."
          description="다시 시도해주세요."
        />
      )}
      {!error && !products.length ? (
        <NotFound
          title="찾으려는 상품이 없습니다."
          description="다른 상품을 검색해주세요."
        />
      ) : (
        <div className="flex flex-col items-center">
          <div className="grid h-full auto-rows-min grid-cols-2 gap-5 p-5 sm:grid-cols-3 xl:grid-cols-4 2xl:w-2/3">
            {products.map((product: ProductData) => (
              <ProductThumbnail key={product.id} product={product} />
            ))}
          </div>
          <div className="lg:hidden">
            <ProductPagination
              totalSize={totalSize}
              displaySize={products.length}
              interval={5}
              page={page ? parseInt(page) : 1}
            />
          </div>
          <div className="hidden lg:block">
            <ProductPagination
              totalSize={totalSize}
              displaySize={products.length}
              interval={10}
              page={page ? parseInt(page) : 1}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
