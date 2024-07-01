import { useNavigate } from "react-router-dom";
import categoryData from "../../data/category.json";

const CategoryDropdown = () => {
  const navigate = useNavigate();
  return (
    <div className="text-black absolute z-10 min-w-[100px] w-[150px] top-full left-[-50%] bg-white border rounded shadow select-none">
      <ul className="text-sm  font-normal p-2 space-y-2 cursor-pointer">
        {Object.values(categoryData).map((category) => (
          <li
            className="hover:text-green-500"
            key={category.id}
            onClick={() => navigate(`/search?category=${category.id}`)}
          >
            {category.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryDropdown;
