import { useEffect, useState } from "react";
import { SearchParamsProps, SelectedFilter } from "types/product";
import { ReactComponent as CloseIcon } from "assets/close.svg";

const SelectedFilters = ({
  searchParams,
  setSearchParams,
}: SearchParamsProps) => {
  const [selected, setSelected] = useState<SelectedFilter[]>([]);

  const removeOption = (option: SelectedFilter) => {
    switch (option.name) {
      case "price":
        searchParams.delete("minPrice");
        searchParams.delete("maxPrice");
        break;
      case "condition":
        searchParams.delete("condition");
        break;
      case "status":
        searchParams.append("status", "0");
        break;
    }
    setSelected((prev) => prev.filter((e) => e.name !== option.name));
    setSearchParams(searchParams);
  };

  const resetOption = () => {
    const resetParams = new URLSearchParams();
    const category = searchParams.get("category");
    if (category) resetParams.append("category", category);
    setSearchParams(resetParams);
  };

  useEffect(() => {
    const options: SelectedFilter[] = [];
    const status = searchParams.get("status");
    const condition = searchParams.get("condition");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    if (!status && status !== "0")
      options.push({ name: "status", text: "판매완료 상품 포함" });
    if (condition && condition === "1")
      options.push({ name: "condition", text: "새상품만 보기" });

    const minPriceWon =
      (minPrice ? parseInt(minPrice).toLocaleString() : "0") + "원";
    const maxPriceWon = maxPrice
      ? parseInt(maxPrice).toLocaleString() + "원"
      : "최대";
    const price = `${minPriceWon} ~ ${maxPriceWon}`;
    if (minPrice || maxPrice) options.push({ name: "price", text: price });

    setSelected(options);
  }, [searchParams]);

  return (
    <div className="flex w-full flex-wrap items-center gap-2">
      {selected.map((e: any) => (
        <div
          className="flex cursor-pointer items-center rounded border bg-white p-1"
          onClick={() => removeOption(e)}
        >
          <CloseIcon className="h-4 w-4 stroke-black" />
          <span>{e.text}</span>
        </div>
      ))}
      <div
        className="ml-auto cursor-pointer text-gray-500"
        onClick={resetOption}
      >
        초기화
      </div>
    </div>
  );
};

export default SelectedFilters;
