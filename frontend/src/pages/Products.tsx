import { useParams, useSearchParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import { ProductData } from "../types/product";
import ProductThumbnail from "../features/product/components/productThumbnail/ProductThumbnail";
import { useState } from "react";
import ProductPagination from "features/product/components/search/ProductPagination";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const page = searchParams.get("page");
  const title = useParams().title;

  console.log("Current Page:", page ? page : "1");

  const params = new URLSearchParams();
  if (title) params.append("keyword", title);
  if (categoryId) params.append("categoryId", categoryId);
  params.append("page", page ? page : "1");

  const url = `search?${params.toString()}`;

  const {
    data,
    error,
    loading,
  }: {
    data: { totalSize: number; products: ProductData[] };
    error: any;
    loading: boolean;
  } = useAxios(url);

  return (
    <>
      {loading && <Loading text="로딩중..." />}
      {error && <div>상품 정보를 불러오지 못했습니다.</div>}
      {!loading && data && (
        <div className="flex flex-col items-center">
          <div className="grid h-full auto-rows-min grid-cols-2 gap-5 p-5 sm:grid-cols-3 xl:grid-cols-4 2xl:w-2/3">
            {data.products.map((product: ProductData) => (
              <ProductThumbnail key={product.id} product={product} />
            ))}
          </div>
          <ProductPagination totalSize={data.totalSize} page={page} />
        </div>
      )}
    </>
  );
};

export default Products;
