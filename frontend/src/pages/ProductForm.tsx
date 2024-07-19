import ImageSelector from "features/product/components/form/ImageSelector";
import categoryData from "features/product/data/category.json";
import useProductForm from "features/product/hooks/useProductForm";
import { CategoryData } from "types/product";

const ProductForm = () => {
  const {
    type,
    disabled,
    categoryId,
    condition,
    title,
    price,
    description,
    images,
    handleSubmitCreate,
    handleSubmitUpdate,
  } = useProductForm();
  const categories: CategoryData[] = Object.values(categoryData);
  return (
    <form
      className="flex h-full w-full flex-col items-center gap-10 p-5 xl:w-2/3"
      onSubmit={type === "modify" ? handleSubmitUpdate : handleSubmitCreate}
    >
      <div className="w-full self-start">
        <ImageSelector {...images} />
      </div>
      <ul className="w-2/3 select-none overflow-auto rounded border bg-white shadow">
        {categories.map((category) => (
          <li
            onClick={() => categoryId.setCategoryId(category.id)}
            className={`p-2 ${
              categoryId.categoryId === category.id && "bg-gray-200"
            }`}
            key={category.id}
          >
            {category.label}
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => condition.setCondition(0)}
          className={`h-10 w-[80px] ${
            !condition.condition ? "button-green" : "button-white"
          }`}
        >
          중고
        </button>
        <button
          type="button"
          onClick={() => condition.setCondition(1)}
          className={`h-10 w-[80px] ${
            condition.condition ? "button-green" : "button-white"
          }`}
        >
          새상품
        </button>
      </div>
      <div className="w-full rounded border bg-white p-3 shadow">
        <input className="w-full p-2" placeholder="상품명" {...title} />
      </div>
      <div className="w-full rounded border bg-white p-3 shadow">
        <input className="w-full p-2" placeholder="₩ 상품가격" {...price} />
      </div>
      <div className="w-full rounded border bg-white p-3 shadow">
        <textarea
          className="h-32 w-full p-2"
          placeholder="상품에 대한 설명을 입력해주세요."
          {...description}
        ></textarea>
      </div>
      <button
        className={`h-14 w-[120px] ${disabled.disabled ? "button-white" : "button-green"}`}
        type="submit"
        disabled={disabled.disabled && true}
      >
        {type === "modify" ? "수정" : "등록"}
      </button>
    </form>
  );
};

export default ProductForm;
