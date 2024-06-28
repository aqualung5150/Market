import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import Carousel from "../components/Carousel";
import { useState } from "react";
import { RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import { setOpenChat, setSendTo } from "../features/chat/chatSlice";
import { ProductData } from "../types/product";
import categoryData from "../features/product/data/category.json";
import { axiosInstance } from "../data/axiosInstance";

const Product = () => {
  const paramId = useParams().id;
  const {
    data,
    error,
    loading,
  }: { data: ProductData; error: any; loading: boolean } = useAxios(
    `product/${paramId}`
  );
  const userId = useSelector((state: RootState) => state.user.id);
  const [imageIndex, setImageIndex] = useState(0);
  const [screenView, setScreenView] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const category = Object.values(categoryData).find(
    (e) => e.id === data?.categoryId
  );

  if (error) alert("상품 정보를 불러올 수 없습니다.");

  const deleteProduct = async () => {
    try {
      await axiosInstance.delete(`/product/${paramId}`);
      alert("상품을 삭제했습니다.");
      navigate(`/product/search?category=${category?.id}`);
    } catch (err: any) {
      alert(`상품 삭제에 실패했습니다. - ${err.message}`);
    }
  };

  return (
    <>
      {loading && <Loading text="로딩중..." />}
      {data && (
        <div className="h-full w-full flex flex-col items-center">
          <div className="m-4 w-3/4 h-1/4 flex justify-center">
            <div className="my-4 mr-4 aspect-square min-w-[200px] min-h-[200px] h-full rounded-2xl shadow-xl select-none">
              <Carousel autoSlide={true}>
                {data.images.map((image, idx) => (
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
            <div className="p-4 my-4 min-w-[200px] min-h-[200px] h-full flex-1 flex flex-col rounded-2xl">
              <div className="p-2 text-lg text-gray-700">
                <span>{"카테고리 > "}</span>
                <span
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(`/product/search?category=${category?.id}`)
                  }
                >
                  {category?.label}
                </span>
              </div>
              <div className="p-2 text-2xl font-bold">{data.title}</div>
              <div className="p-2 text-4xl font-bold">
                {data.price.toLocaleString()}원
              </div>
              {userId === data.user.id && (
                <div className="cursor-pointer" onClick={() => deleteProduct()}>
                  글 삭제하기
                </div>
              )}
            </div>
          </div>
          <div className="flex mt-4 w-3/4 justify-center">
            <div className="m-4 min-h-[500px] flex-1 flex flex-col">
              <div className="mb-4 text-3xl">상품정보</div>
              <div>{data.description}</div>
            </div>
            {userId !== data.user.id && (
              <div className="m-4 min-h-[500px] flex-1">
                <div className="mb-4 text-3xl">판매자</div>
                <div>안녕하세요 저는 '{data.user.nickname}'입니다.</div>
                <button
                  className="w-[100px] h-[50px] bg-gray-400 rounded"
                  onClick={() => {
                    dispatch(setSendTo(data.user.id));
                    dispatch(setOpenChat(true));
                  }}
                >
                  채팅하기
                </button>
              </div>
            )}
          </div>
          {screenView && (
            <div
              className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-85 flex justify-center items-center"
              onClick={() => setScreenView(false)}
            >
              <Carousel initialIndex={imageIndex}>
                {data.images.map((image, idx) => (
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
