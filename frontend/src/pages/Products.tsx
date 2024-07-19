import { useParams, useSearchParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import { ProductData, ProductsData } from "../types/product";
import ProductThumbnail from "../features/product/components/productThumbnail/ProductThumbnail";
import { useEffect } from "react";
import NotFound from "components/NotFound";
import ProductsFilter from "features/product/components/search/ProductsFilter";
import ProductsPagination from "features/product/components/search/ProductsPagination";
import ProductsFilterMobile from "features/product/components/search/ProductsFilterMobile";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  useEffect(() => {
    if (page) return;
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  }, [page]);

  const reqParams = new URLSearchParams();
  // searching keyword
  const keyword = useParams().keyword;
  if (keyword) reqParams.append("keyword", keyword);
  // append queries
  searchParams.forEach((value, key) => {
    reqParams.append(key, value);
  });
  const url = "search?" + reqParams.toString();

  const { data, error, loading } = useAxios<ProductsData>(url);

  if (error)
    return (
      <NotFound
        title="상품 정보를 불러오지 못했습니다."
        description="다시 시도해주세요."
      />
    );

  return (
    <div className="flex h-full w-full flex-col items-center gap-5 p-5 2xl:w-2/3">
      <ProductsFilterMobile
        keyword={keyword}
        {...{ searchParams, setSearchParams }}
      />
      <ProductsFilter
        keyword={keyword}
        {...{ searchParams, setSearchParams }}
      />
      {data ? (
        <>
          {data.products && data.products.length > 0 ? (
            <>
              <div className="grid h-full w-full auto-rows-min grid-cols-2 gap-5 sm:grid-cols-3 xl:grid-cols-4">
                {data.products.map((product: ProductData) => (
                  <ProductThumbnail key={product.id} product={product} />
                ))}
              </div>
              <div className="w-full lg:hidden">
                <ProductsPagination
                  totalSize={data.totalSize}
                  displaySize={20}
                  interval={5}
                  {...{ searchParams, setSearchParams }}
                />
              </div>
              <div className="hidden w-full lg:block">
                <ProductsPagination
                  totalSize={data.totalSize}
                  displaySize={20}
                  interval={10}
                  {...{ searchParams, setSearchParams }}
                />
              </div>
            </>
          ) : (
            <NotFound
              title="찾으려는 상품이 없습니다."
              description="다른 상품을 검색해주세요."
            />
          )}
        </>
      ) : (
        <Loading text="로딩중..." />
      )}
    </div>
  );
};

export default Products;
