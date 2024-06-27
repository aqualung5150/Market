import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import Carousel from "../components/Carousel";
import { useState } from "react";

const Product = () => {
  const paramId = useParams().id;
  const navigate = useNavigate();
  const { data, error, loading } = useAxios(`product/${paramId}`);
  const [screenView, setScreenView] = useState(false);

  if (error) {
    alert("상품 정보를 불러올 수 없습니다.");
    navigate(-1);
  }

  return (
    <>
      {loading && <Loading text="로딩중..." />}
      {data && (
        <div className="h-full w-full flex flex-col items-center">
          <div className="min-w-[200px] w-[520px] min-h-[200px] h-[520px]">
            <Carousel autoSlide={true} onClick={() => setScreenView(true)}>
              {data?.images?.map((image: any, idx: number) => (
                <img
                  key={idx}
                  className="aspect-square object-cover"
                  src={`${process.env.REACT_APP_API_URL}/product/productImage/${image.url}`}
                />
              ))}
            </Carousel>
          </div>
          <div>{data.title}</div>
          <div>{data.price}</div>
          <div>{data.description}</div>
          {screenView && (
            <div
              className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 flex justify-center items-center"
              onClick={() => setScreenView(false)}
            >
              <div className="flex h-full overflow-auto">
                {data?.images?.map((image: any, idx: number) => (
                  <img
                    key={idx}
                    className="object-contain"
                    src={`${process.env.REACT_APP_API_URL}/product/productImage/${image.url}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Product;
