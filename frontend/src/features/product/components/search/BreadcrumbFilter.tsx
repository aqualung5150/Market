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

  const navCategory = (categoryId: string) => {
    searchParams.set("category", categoryId);
    setSearchParams(searchParams);
  };
  return (
    <ul className="breadcrumb">
      <li>
        <Link to={`/search?page=1`}>전체</Link>
      </li>
      {category && (
        <li onClick={() => navCategory(categoryId)}>{category.label}</li>
      )}
    </ul>
  );
};

export default React.memo(BreadcrumbFilter);
