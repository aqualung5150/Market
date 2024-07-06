import { Link } from "react-router-dom";
import categoryData from "../../data/category.json";

const CategoryDropdown = () => {
  console.log("category dropdown");
  return (
    <div className="absolute left-[-50%] top-full z-10 w-[150px] min-w-[100px] select-none rounded border bg-white text-black shadow">
      <ul className="cursor-pointer space-y-2 p-2 text-sm font-normal">
        {Object.values(categoryData).map((category) => (
          <li className="hover:text-green-500" key={category.id}>
            <Link to={`/search?category=${category.id}&page=1`}>
              {category.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryDropdown;
