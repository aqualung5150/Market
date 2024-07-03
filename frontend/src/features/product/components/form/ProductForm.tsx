import Input from "../../../../components/Input";
import ImageSelector from "./ImageSelector";
import categoryData from "../../data/category.json";
import { CategoryData } from "../../../../types/product";
import useProductForm from "../../hooks/useProductForm";

const ProductForm = () => {
  const {
    buttonDisable,
    categoryId,
    isNew,
    title,
    price,
    description,
    images,
    handleSubmit,
  } = useProductForm();
  const categories: CategoryData[] = [];
  Object.values(categoryData).map((category) => categories.push(category));

  const buttonOn =
    "h-10 w-[80px] rounded-md border border-solid font-semibold text-base mb-2 text-white bg-green-500 border-green-500";
  const buttonOff =
    "h-10 w-[80px] rounded-md border border-solid font-semibold text-base mb-2 border-jnblack text-black bg-white";

  return (
    <form
      className="flex flex-col items-center w-full h-full p-10 gap-10"
      onSubmit={handleSubmit}
    >
      <div className="self-start w-full">
        <ImageSelector {...images} />
      </div>
      <ul className="w-2/3 rounded bg-white shadow overflow-auto">
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
          onClick={() => isNew.setIsNew(0)}
          className={!isNew.isNew ? buttonOn : buttonOff}
        >
          중고
        </button>
        <button
          type="button"
          onClick={() => isNew.setIsNew(1)}
          className={isNew.isNew ? buttonOn : buttonOff}
        >
          새상품
        </button>
      </div>
      <div className="w-full p-3 bg-white rounded shadow">
        <Input placeholder="상품명" {...title} />
      </div>
      <div className="w-full p-3 bg-white rounded shadow">
        <Input placeholder="₩ 판매가격" {...price} />
      </div>
      <div className="w-full p-3 bg-white rounded shadow">
        <Input
          placeholder="상품에 대한 설명을 입력해주세요."
          {...description}
        />
      </div>
      <button
        className="w-[100px] h-[50px] bg-green-400 rounded-lg text-lg font-bold"
        type="submit"
        disabled={buttonDisable.buttonDisable}
      >
        등록
      </button>
    </form>
  );
};

export default ProductForm;
