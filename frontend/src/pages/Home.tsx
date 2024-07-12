import { useDispatch } from "react-redux";
import { setOpenChat, setSendTo } from "../features/chat/chatSlice";
import throttle from "../utils/throttle";
import { useCallback, useEffect, useState } from "react";
import Carousel from "components/Carousel";
import useAxios from "hooks/useAxios";
import { ProductsData } from "types/product";
import { Link } from "react-router-dom";

const Home = () => {
  const [spread, setSpread] = useState(false);
  const [selected, setSelected] = useState(-1);
  const translateX = [
    "md:translate-x-64 translate-x-40",
    "md:-translate-x-64 -translate-x-40",
    "md:translate-x-32 translate-x-20",
    "md:-translate-x-32 -translate-x-20",
    "md:translate-x-0 translate-x-0",
  ];
  const translateY = [
    "md:translate-y-9 translate-y-6",
    "md:translate-y-9 translate-y-6",
    "md:translate-y-3 translate-y-2",
    "md:translate-y-3 translate-y-2",
    "md:translate-y-0 translate-y-0",
  ];
  const rotate = [
    "rotate-12",
    "-rotate-12",
    "rotate-6",
    "-rotate-6",
    "rotate-0",
  ];
  const { data, error, loading } = useAxios<ProductsData>("search");

  useEffect(() => {
    setTimeout(() => {
      setSpread(true);
    }, 500);
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center">
      {data && (
        <div className="relative flex h-full w-full justify-center overflow-hidden p-10">
          {data.products
            .slice(0, 5)
            .reverse()
            .map((e, idx) => (
              <div
                key={idx}
                onClick={() => setSelected(idx)}
                className={`${spread ? (selected !== idx ? `${translateX[idx]} ${rotate[idx]} ${translateY[idx]} shadow` : "translate-y-56 shadow md:translate-y-96") : "shadow-sm"} absolute h-44 w-44 rounded-xl bg-gray-100 p-3 duration-500 md:h-80 md:w-80 md:p-5`}
              >
                <Link
                  to={`/product/${e.id}`}
                  className={`${selected !== idx && "pointer-events-none"}`}
                >
                  <img
                    className="aspect-square rounded-xl object-cover"
                    src={`${process.env.REACT_APP_API_URL}/product/productImage/${e.images[0].url}?impolicy=main`}
                  />
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;
