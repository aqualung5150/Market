import NotFound from "components/NotFound";
import useAxios from "hooks/useAxios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ProductData, ProductsData } from "types/product";
import categoryData from "../../product/data/category.json";
import useFormInput from "hooks/useFormInput";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = Object.values(categoryData);

  //fetch
  const url =
    "search" + (searchParams.size ? "?" + searchParams.toString() : "");
  const { data, error, loading } = useAxios<ProductsData>(url);
  const [selected, setSelected] = useState<number[]>([]);

  const { inputProps: title, setValue: setTitle } = useFormInput();
  const { inputProps: id, setValue: setId } = useFormInput();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.value) searchParams.set("keyword", title.value);
    else searchParams.delete("keyword");
    if (id.value) searchParams.set("id", id.value);
    else searchParams.delete("id");

    setSearchParams(searchParams);
  };

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

  const reset = () => {
    searchParams.delete("keyword");
    searchParams.delete("id");

    setTitle("");
    setId("");

    setSearchParams(searchParams);
  };

  console.log(selected);

  if (error) return <NotFound title="정보를 불러올 수 없습니다." />;

  return (
    <div className="flex h-full w-full flex-col gap-5 overflow-auto p-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex w-96 items-center justify-between">
          <label htmlFor="title">Title</label>
          <input className="w-72 rounded border p-2" id="title" {...title} />
        </div>
        <div className="flex w-96 items-center justify-between">
          <label htmlFor="id">ID</label>
          <input className="w-72 rounded border p-2" id="id" {...id} />
        </div>
        <div className="flex gap-5">
          <button className="h-[50px] w-[180px] rounded bg-black font-semibold text-white">
            검색
          </button>
          <button
            onClick={() => reset()}
            type="button"
            className="h-[50px] w-[180px] rounded border font-semibold"
          >
            초기화
          </button>
        </div>
      </form>
      {data && (
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
            {data.products.map((product) => (
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
                  {categories.find((e) => e.id === product.categoryId)?.label}
                </td>
                <td>{product.status === 1 ? "판매완료" : "판매중"}</td>
                <td>{product.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default AdminProducts;
