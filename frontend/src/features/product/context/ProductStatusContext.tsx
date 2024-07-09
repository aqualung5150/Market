import { createContext } from "react";
import { ProductStatusContextType } from "types/context";

const ProductStatusContext = createContext<ProductStatusContextType>({
  status: 0,
  setStatus: null,
});

export default ProductStatusContext;
