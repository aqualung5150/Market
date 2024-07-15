import { SearchParamsProps } from "types/product";
import { ReactComponent as AngleDownIcon } from "assets/angleDown.svg";
import { ReactComponent as AngleUpIcon } from "assets/angleUp.svg";
import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import PriceFilterMobile from "./PriceFilterMobile";
import OptionFilter from "./OptionFilter";
import BreadcrumbFilter from "./BreadcrumbFilter";
import SelectedFilters from "./SelectedFilters";

const ProductsFilterMobile = ({
  searchParams,
  setSearchParams,
}: SearchParamsProps) => {
  const [openCategory, setOpenCategory] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [openOption, setOpenOption] = useState(false);

  return (
    <div className="flex w-full flex-col border-y-2 border-black bg-gray-100 lg:hidden">
      <ul>
        <li className="flex min-h-14 w-full flex-col gap-2 border-b p-2">
          <div className="flex items-center justify-between">
            <BreadcrumbFilter {...{ searchParams, setSearchParams }} />
            {openCategory ? (
              <AngleUpIcon
                onClick={() => setOpenCategory(!openCategory)}
                className="h-10 w-10"
              />
            ) : (
              <AngleDownIcon
                onClick={() => setOpenCategory(!openCategory)}
                className="h-10 w-10"
              />
            )}
          </div>
          {openCategory && (
            <CategoryFilter {...{ searchParams, setSearchParams }} />
          )}
        </li>
        <li className="flex min-h-14 w-full flex-col gap-2 border-b p-2">
          <div className="flex items-center justify-between">
            <span>가격</span>
            {openPrice ? (
              <AngleUpIcon
                onClick={() => setOpenPrice(!openPrice)}
                className="h-10 w-10"
              />
            ) : (
              <AngleDownIcon
                onClick={() => setOpenPrice(!openPrice)}
                className="h-10 w-10"
              />
            )}
          </div>
          {openPrice && (
            <PriceFilterMobile {...{ searchParams, setSearchParams }} />
          )}
        </li>

        <li className="flex min-h-14 w-full flex-col gap-2 border-b p-2">
          <div className="flex items-center justify-between">
            <span>옵션</span>
            {openOption ? (
              <AngleUpIcon
                onClick={() => setOpenOption(!openOption)}
                className="h-10 w-10"
              />
            ) : (
              <AngleDownIcon
                onClick={() => setOpenOption(!openOption)}
                className="h-10 w-10"
              />
            )}
          </div>
          {openOption && (
            <OptionFilter {...{ searchParams, setSearchParams }} />
          )}
        </li>
        <li className="flex min-h-14 w-full flex-col gap-2 p-2">
          <span className="text-nowrap">필터</span>
          <SelectedFilters {...{ searchParams, setSearchParams }} />
        </li>
      </ul>
    </div>
  );
};

export default ProductsFilterMobile;
