import React from "react";
import categoryData from "../../data/category.json";

//TODO
const ProductsHeader = ({ categoryId, title }: any) => {
  const category = Object.values(categoryData).find((e) => e.id === categoryId);
  return (
    <div className="flex">
      <div>검색결과: {title}</div>
      <div>카테고리: {category?.label}</div>
    </div>
  );
};

export default React.memo(ProductsHeader);
