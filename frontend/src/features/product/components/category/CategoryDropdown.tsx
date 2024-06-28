import { useNavigate } from "react-router-dom";
import categoryData from "../../data/category.json";

const CategoryDropdown = () => {
  const navigate = useNavigate();
  return (
    <div className="absolute min-w-[100px] w-[140px] top-full left-0 bg-white border rounded shadow select-none">
      <ul className="text-sm  font-normal p-2 space-y-2 cursor-pointer">
        {Object.values(categoryData).map((category) => (
          <li
            onClick={() => navigate(`/product/search?category=${category.id}`)}
          >
            {category.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryDropdown;
