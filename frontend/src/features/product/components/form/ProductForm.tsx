import ImageSelector from "./ImageSelector";
import categoryData from "../../data/category.json";
import { CategoryData } from "../../../../types/product";
import useProductForm from "../../hooks/useProductForm";

const ProductForm = () => {
  const {
    type,
    buttonDisable,
    categoryId,
    condition,
    title,
    price,
    description,
    images,
    handleSubmitCreate,
    handleSubmitUpdate,
  } = useProductForm();
  const categories: CategoryData[] = [];
  Object.values(categoryData).map((category) => categories.push(category));

  const buttonOn =
    "h-10 w-[80px] rounded-md border border-solid font-semibold text-base mb-2 text-white bg-green-500 border-green-500";
  const buttonOff =
    "h-10 w-[80px] rounded-md border border-solid font-semibold text-base mb-2 border-jnblack text-black bg-white";

  return (
    <form
      className="xl:w-2/3 flex flex-col items-center w-full h-full p-5 gap-10"
      onSubmit={type === "modify" ? handleSubmitUpdate : handleSubmitCreate}
    >
      <div className="self-start w-full">
        <ImageSelector {...images} />
      </div>
      <ul className="w-2/3 rounded bg-white shadow overflow-auto select-none">
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
          className={!condition.condition ? buttonOn : buttonOff}
        >
          중고
        </button>
        <button
          type="button"
          onClick={() => condition.setCondition(1)}
          className={condition.condition ? buttonOn : buttonOff}
        >
          새상품
        </button>
      </div>
      <div className="w-full p-3 bg-white rounded shadow">
        <input className="w-full p-2" placeholder="상품명" {...title} />
      </div>
      <div className="w-full p-3 bg-white rounded shadow">
        <input className="w-full p-2" placeholder="₩ 상품가격" {...price} />
      </div>
      <div className="w-full p-3 bg-white rounded shadow">
        <textarea
          className="w-full h-32 p-2"
          placeholder="상품에 대한 설명을 입력해주세요."
          {...description}
        ></textarea>
      </div>
      <button
        className="h-14 w-[120px] rounded-md border border-solid font-semibold text-base mb-2 text-white bg-green-500 border-green-500"
        type="submit"
        disabled={buttonDisable.buttonDisable}
      >
        {type === "modify" ? "수정" : "등록"}
      </button>
    </form>
  );
};

export default ProductForm;
