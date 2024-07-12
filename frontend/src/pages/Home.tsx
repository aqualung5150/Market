import { useDispatch } from "react-redux";
import { setOpenChat, setSendTo } from "../features/chat/chatSlice";
import throttle from "../utils/throttle";
import { useCallback, useEffect, useState } from "react";
import Carousel from "components/Carousel";
import useAxios from "hooks/useAxios";
import { ProductsData } from "types/product";
import { Link } from "react-router-dom";
import { ReactComponent as AngleDoubleUpIcon } from "assets/angleDoubleUp.svg";

const Home = () => {
  const [spread, setSpread] = useState(false);
  const [selected, setSelected] = useState(-1);
  const translate = [
    "lg:translate-x-96 translate-x-40 lg:translate-y-12 translate-y-6 rotate-12",
    "lg:-translate-x-96 -translate-x-40 lg:translate-y-12 translate-y-6 -rotate-12",
    "lg:translate-x-52 translate-x-20 lg:translate-y-4 translate-y-2 rotate-6",
    "lg:-translate-x-52 -translate-x-20 lg:translate-y-4 translate-y-2 -rotate-6",
    "lg:translate-x-0 translate-x-0 lg:translate-y-0 translate-y-0 rotate-0",
  ];

  const { data, error, loading } = useAxios<ProductsData>("search");

  useEffect(() => {
    if (!data) return;
    setTimeout(() => {
      setSpread(true);
    }, 800);
  }, [data]);

  return (
    <div className="flex h-full w-full flex-col items-center gap-5 lg:gap-10">
      {data && (
        <div className="relative flex h-[320px] w-full justify-center overflow-hidden pt-5 lg:h-[800px] lg:pt-10">
          {data.products
            .slice(0, 5)
            .reverse()
            .map((e, idx) => (
              <div
                key={idx}
                onClick={() => setSelected(idx)}
                className={`${spread ? (selected !== idx ? `${translate[idx]} shadow` : "translate-y-40 shadow lg:translate-y-96") : "shadow-sm"} absolute h-28 w-28 rounded-xl bg-gray-100 p-2 duration-500 lg:h-80 lg:w-80 lg:p-5`}
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
          {selected < 0 && (
            <div className="absolute top-[180px] flex flex-col items-center gap-5 text-lg font-semibold text-black lg:top-[480px] lg:gap-10 lg:text-3xl">
              <AngleDoubleUpIcon className="h-12 w-12 animate-bounce fill-black lg:h-24 lg:w-24" />
              <span>새로 등록된 상품들을 확인해보세요.</span>
            </div>
          )}
        </div>
      )}
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-5 bg-gray-50 p-10 px-10">
        <span className="text-md font-semibold lg:text-xl">
          더 많은 상품을 구경해보세요.
        </span>
        <Link to="/search?page=1">
          <button className="h-14 w-28 rounded bg-green-500 text-white">
            보러가기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
