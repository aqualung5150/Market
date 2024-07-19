import React from "react";
import categoryData from "../../data/category.json";
import { Link } from "react-router-dom";
import { SearchParamsProps } from "types/product";

const BreadcrumbFilter = ({
  searchParams,
  setSearchParams,
}: SearchParamsProps) => {
  const categoryId = searchParams.get("category");
  const category =
    categoryId &&
    Object.values(categoryData).find((e) => e.id === parseInt(categoryId));

  return (
    <ul className="breadcrumb">
      <li>
        <Link to={`/search?page=1`}>전체</Link>
      </li>
      {category && (
        <li>
          <Link
            to={`?${searchParams.toString().replace(/category=\d+/, `category=${categoryId}`)}`}
          >
            {category.label}
          </Link>
        </li>
      )}
    </ul>
  );
};

export default React.memo(BreadcrumbFilter);
