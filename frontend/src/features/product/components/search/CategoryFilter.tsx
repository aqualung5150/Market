import { SearchParamsProps } from "types/product";
import categoryData from "../../data/category.json";

const CategoryFilter = ({
  searchParams,
  setSearchParams,
}: SearchParamsProps) => {
  const navCategory = (categoryId: string) => {
    searchParams.set("category", categoryId);
    setSearchParams(searchParams);
  };

  return (
    <div className="grid grid-cols-3 gap-3 text-sm">
      {Object.values(categoryData).map((e) => (
        <span
          className="cursor-pointer"
          key={e.id}
          onClick={() => navCategory(e.id.toString())}
        >
          {e.label}
        </span>
      ))}
    </div>
  );
};

export default CategoryFilter;
