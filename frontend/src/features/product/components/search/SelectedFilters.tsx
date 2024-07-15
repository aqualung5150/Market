import { useEffect, useState } from "react";
import { SearchParamsProps } from "types/product";
import { ReactComponent as CloseIcon } from "assets/close.svg";

const SelectedFilters = ({
  searchParams,
  setSearchParams,
}: SearchParamsProps) => {
  const [selected, setSelected] = useState<any[]>([]);

  const removeOption = (option: any) => {
    if (option.name === "price") {
      searchParams.delete("minPrice");
      searchParams.delete("maxPrice");
      setSelected((prev) => prev.filter((e) => e.name !== "price"));
      setSearchParams(searchParams);
    } else {
      searchParams.append("filter", option.name);
      setSelected((prev) => prev.filter((e) => e.name !== option.name));
      setSearchParams(searchParams);
    }
  };

  const resetOption = () => {
    const resetParams = new URLSearchParams();
    const category = searchParams.get("category");
    if (category) resetParams.append("category", category);
    setSearchParams(resetParams);
  };

  useEffect(() => {
    const options: object[] = [];
    const filters = searchParams.getAll("filter");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    // const appendFilter = (filter: string) => {
    //   searchParams.append("filter", filter);
    //   setSearchParams(searchParams);
    // };

    // const deletePrice = () => {
    //   searchParams.delete("minPrice");
    //   searchParams.delete("maxPrice");
    //   setSearchParams(searchParams);
    // };

    if (!filters.find((e) => e === "sold"))
      options.push({ name: "sold", text: "판매완료 상품 포함" });
    if (!filters.find((e) => e === "used"))
      options.push({ name: "used", text: "중고상품 포함" });
    if (!filters.find((e) => e === "new"))
      options.push({ name: "new", text: "새상품 포함" });

    const minPriceWon =
      (minPrice ? parseInt(minPrice).toLocaleString() : "0") + "원";
    const maxPriceWon = maxPrice
      ? parseInt(maxPrice).toLocaleString() + "원"
      : "최대";
    const price = `${minPriceWon} ~ ${maxPriceWon}`;
    if (minPrice || maxPrice) options.push({ name: "price", text: price });

    // console.log(options);
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
