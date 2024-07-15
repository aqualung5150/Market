import { ProductFilterProps } from "types/product";
import { ReactComponent as AngleDownIcon } from "assets/angleDown.svg";
import { ReactComponent as AngleUpIcon } from "assets/angleUp.svg";
import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import PriceFilterMobile from "./PriceFilterMobile";
import OptionFilter from "./OptionFilter";
import BreadcrumbFilter from "./BreadcrumbFilter";
import SelectedFilters from "./SelectedFilters";

const ProductsFilterMobile = ({
  keyword,
  searchParams,
  setSearchParams,
}: ProductFilterProps) => {
  const [openCategory, setOpenCategory] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [openOption, setOpenOption] = useState(false);

  return (
    <div className="w-full lg:hidden">
      <div className="flex gap-2 pb-2 pl-2">
        {keyword && (
          <h1>
            <strong>"{keyword}"</strong>
          </h1>
        )}
        <h1>검색결과</h1>
      </div>
      <div className="flex w-full flex-col border-y-2 border-black">
        <ul>
          <li className="flex min-h-14 w-full flex-col gap-2 border-b p-2">
            <div className="flex items-center justify-between">
              <BreadcrumbFilter {...{ searchParams, setSearchParams }} />
              {openCategory ? (
                <AngleUpIcon
                  onClick={() => setOpenCategory(false)}
                  className="h-10 w-10"
                />
              ) : (
                <AngleDownIcon
                  onClick={() => setOpenCategory(true)}
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
                  onClick={() => setOpenPrice(false)}
                  className="h-10 w-10"
                />
              ) : (
                <AngleDownIcon
                  onClick={() => setOpenPrice(true)}
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
                  onClick={() => setOpenOption(false)}
                  className="h-10 w-10"
                />
              ) : (
                <AngleDownIcon
                  onClick={() => setOpenOption(true)}
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
    </div>
  );
};

export default ProductsFilterMobile;
