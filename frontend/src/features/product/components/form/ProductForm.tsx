import ImageSelector from "./ImageSelector";
import categoryData from "../../data/category.json";
import { CategoryData } from "../../../../types/product";
import useProductForm from "../../hooks/useProductForm";

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
  const categories: CategoryData[] = [];
  Object.values(categoryData).map((category) => categories.push(category));

  const buttonSmall = "h-10 w-[80px]";
  const buttonLarge = "h-14 w-[120px]";
  const buttonOn =
    "rounded-md font-semibold text-base mb-2 text-white bg-green-500 border-green-500";
  const buttonOff =
    "rounded-md font-semibold text-base mb-2 border-jnblack text-black bg-white";

  return (
    <form
      className="flex h-full w-full flex-col items-center gap-10 p-5 xl:w-2/3"
      onSubmit={type === "modify" ? handleSubmitUpdate : handleSubmitCreate}
    >
      <div className="w-full self-start">
        <ImageSelector {...images} />
      </div>
      <ul className="w-2/3 select-none overflow-auto rounded bg-white shadow">
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
          className={`${buttonSmall} ${
            !condition.condition ? buttonOn : buttonOff
          }`}
        >
          중고
        </button>
        <button
          type="button"
          onClick={() => condition.setCondition(1)}
          className={`${buttonSmall} ${
            condition.condition ? buttonOn : buttonOff
          }`}
        >
          새상품
        </button>
      </div>
      <div className="w-full rounded bg-white p-3 shadow">
        <input className="w-full p-2" placeholder="상품명" {...title} />
      </div>
      <div className="w-full rounded bg-white p-3 shadow">
        <input className="w-full p-2" placeholder="₩ 상품가격" {...price} />
      </div>
      <div className="w-full rounded bg-white p-3 shadow">
        <textarea
          className="h-32 w-full p-2"
          placeholder="상품에 대한 설명을 입력해주세요."
          {...description}
        ></textarea>
      </div>
      <button
        className={`${buttonLarge} ${
          disabled.disabled || images.disabled ? buttonOff : buttonOn
        }`}
        type="submit"
        disabled={(disabled.disabled || images.disabled) && true}
      >
        {disabled.disabled || images.disabled
          ? "처리중"
          : type === "modify"
            ? "수정"
            : "등록"}
      </button>
    </form>
  );
};

export default ProductForm;
