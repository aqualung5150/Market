import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import Carousel from "../components/Carousel";
import { useState } from "react";

const Product = () => {
  const paramId = useParams().id;
  const navigate = useNavigate();
  const { data, error, loading } = useAxios(`product/${paramId}`);
  const [imageIndex, setImageIndex] = useState(0);
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
          <div className="min-w-[200px] w-[520px] min-h-[200px] h-[520px] rounded-lg shadow-xl">
            <Carousel autoSlide={true}>
              {data?.images?.map((image: any, idx: number) => (
                <img
                  onClick={() => {
                    setImageIndex(idx);
                    setScreenView(true);
                  }}
                  key={idx}
                  className="aspect-square object-cover rounded-2xl"
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
              className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-85 flex justify-center items-center"
              onClick={() => setScreenView(false)}
            >
              <Carousel initialIndex={imageIndex}>
                {data?.images?.map((image: any, idx: number) => (
                  <div
                    key={idx}
                    className="w-screen h-screen shrink-0 flex items-center"
                  >
                    <img
                      className="object-contain w-full h-full"
                      src={`${process.env.REACT_APP_API_URL}/product/productImage/${image.url}`}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Product;
