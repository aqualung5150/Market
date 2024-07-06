import React, { useContext, useState } from "react";
import Carousel from "../../../../components/Carousel";
import { ProductImageData, ProductImageProps } from "../../../../types/product";
import ProductStatusContext from "../../context/ProductStatusContext";
import { ReactComponent as CheckIcon } from "../../../../assets/check.svg";

const ProductImage = ({ data }: ProductImageProps) => {
  const [imageIndex, setImageIndex] = useState(-1);
  const status = useContext(ProductStatusContext).status;

  return (
    <>
      <Carousel autoSlide={true}>
        {data.images.map((image: ProductImageData, idx: number) => (
          <div
            key={idx}
            className="relative aspect-square"
            onClick={() => setImageIndex(idx)}
          >
            <img
              className="aspect-square object-cover rounded-2xl"
              src={`${process.env.REACT_APP_API_URL}/product/productImage/${image.url}`}
            />
            {status === 1 && (
              <div className="absolute w-full h-full top-0 left-0 bg-black/50 rounded-2xl flex flex-col justify-center items-center gap-2">
                <CheckIcon className="w-24 h-24 stroke-white/85" />
                <span className="text-white/85 text-2xl font-bold">
                  판매완료
                </span>
              </div>
            )}
          </div>
        ))}
      </Carousel>
      {imageIndex > -1 && (
        <div
          className="fixed z-10 top-0 left-0 w-screen h-screen bg-black bg-opacity-85 flex justify-center items-center"
          onClick={() => setImageIndex(-1)}
        >
          <Carousel initialIndex={imageIndex}>
            {data.images.map((image: ProductImageData, idx: number) => (
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
    </>
  );
};

export default React.memo(ProductImage);
