import useFormInput from "hooks/useFormInput";
import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const usePriceFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { inputProps: minPrice, setValue: setMinPrice } = useFormInput("");
  const { inputProps: maxPrice, setValue: setMaxPrice } = useFormInput("");

  const isNumeric = useCallback((string: string) => /^\d*$/.test(string), []);

  useEffect(() => {
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    setMinPrice(minPriceParam ? minPriceParam : "");
    setMaxPrice(maxPriceParam ? maxPriceParam : "");
  }, [searchParams]);

  const handleClick = () => {
    if (!isNumeric(minPrice.value) || !isNumeric(maxPrice.value)) return;
    searchParams.set("minPrice", minPrice.value ? minPrice.value : "0");
    if (maxPrice.value) searchParams.set("maxPrice", maxPrice.value);
    else searchParams.delete("maxPrice");
    setSearchParams(searchParams);
  };

  return { minPrice, maxPrice, handleClick };
};

export default usePriceFilter;
