import { Link } from "react-router-dom";
import categoryData from "../../data/category.json";

const CategoryDropdown = () => {
  return (
    <div className="absolute left-[-50%] top-full z-10 h-64 w-[150px] min-w-[100px] select-none rounded border bg-white text-black shadow">
      <ul className="flex h-full w-full cursor-pointer flex-col p-2 text-sm font-normal">
        {Object.values(categoryData).map((category) => (
          <li className="h-full w-full" key={category.id}>
            <Link
              className="flex h-full w-full items-center hover:text-green-500"
              to={`/search?category=${category.id}&page=1`}
            >
              <span>{category.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryDropdown;
