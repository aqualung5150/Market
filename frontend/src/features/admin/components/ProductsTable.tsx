import { CategoryData, ProductData, ProductsData } from "types/product";
import categoryData from "../../product/data/category.json";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { axiosInstance } from "data/axiosInstance";
import { useState } from "react";
import useAxios from "hooks/useAxios";
import NotFound from "components/NotFound";
import Loading from "components/Loading";
import ProductsPagination from "features/product/components/search/ProductsPagination";

const ProductsTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const url =
    "search" + (searchParams.size ? "?" + searchParams.toString() : "");
  const { data, error, loading } = useAxios<ProductsData>(url);
  const [selected, setSelected] = useState<number[]>([]);
  const navigate = useNavigate();
  const categories = Object.values(categoryData);
  const { pathname, search } = useLocation();

  const checkSelected = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    if (e.target.checked) setSelected((prev) => prev.concat(id));
    else setSelected((prev) => prev.filter((e) => e !== id));
  };

  const checkAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!data) return;
    if (e.target.checked)
      setSelected(data?.products.map((product) => product.id));
    else setSelected([]);
  };

  const deleteProducts = async () => {
    if (selected.length < 1) return;

    try {
      await axiosInstance.post("product/deleteMany", {
        products: selected,
      });
      navigate(pathname + search);
    } catch (err) {
      alert(err);
    }
  };

  if (loading) return <Loading text="로딩중..." />;
  if (error) return <NotFound title="상품 정보를 불러올 수 없습니다." />;
  if (data)
    return (
      <>
        <div className="flex items-center justify-end gap-10">
          <button
            onClick={deleteProducts}
            className="h-14 w-32 rounded bg-red-500 font-semibold text-white"
          >
            삭제
          </button>
        </div>

        <table className="data-grid w-full">
          <tbody>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selected.length === data.products.length}
                  onChange={(e) => checkAll(e)}
                />
              </th>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Status</th>
              <th>User ID</th>
            </tr>
            {data.products.map((product: ProductData) => (
              <tr
                className="cursor-pointer"
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <th
                  className="cursor-default"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(product.id)}
                    onChange={(e) => checkSelected(e, product.id)}
                  />
                </th>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                  {
                    categories.find(
                      (e: CategoryData) => e.id === product.categoryId,
                    )?.label
                  }
                </td>
                <td>{product.status === 1 ? "판매완료" : "판매중"}</td>
                <td>{product.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ProductsPagination
          totalSize={data.totalSize}
          displaySize={20}
          interval={10}
          {...{ searchParams, setSearchParams }}
        />
      </>
    );
  return null;
};

export default ProductsTable;
