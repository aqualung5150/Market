import Carousel from "components/Carousel";
import ProductStatusContext from "features/product/context/ProductStatusContext";
import React, { useContext, useState } from "react";
import { ProductImageData, ProductImageProps } from "types/product";
import { ReactComponent as CheckIcon } from "assets/check.svg";

const ProductImage = ({ data }: ProductImageProps) => {
  const [imageIndex, setImageIndex] = useState(-1);
  const status = useContext(ProductStatusContext).status;

  return (
    <>
      <Carousel autoSlide={true}>
        {data.images.map((image: ProductImageData, idx: number) => (
          <div
            key={idx}
            className="relative w-full shrink-0"
            onClick={() => setImageIndex(idx)}
          >
            <img
              className="aspect-square w-full rounded-2xl object-cover"
              src={`${process.env.REACT_APP_API_URL}/product/productImage/${image.url}?impolicy=main`}
            />
            {status === 1 && (
              <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl bg-black/50">
                <CheckIcon className="h-24 w-24 stroke-white/85" />
                <span className="text-2xl font-bold text-white/85">
                  판매완료
                </span>
              </div>
            )}
          </div>
        ))}
      </Carousel>
      {imageIndex > -1 && (
        <div
          className="fixed left-0 top-0 z-10 flex h-dvh w-dvw items-center justify-center bg-black bg-opacity-85"
          onClick={() => setImageIndex(-1)}
        >
          <Carousel initialIndex={imageIndex}>
            {data.images.map((image: ProductImageData, idx: number) => (
              <div
                key={idx}
                className="flex h-dvh w-dvw shrink-0 items-center"
              >
                <img
                  className="h-full w-full object-contain"
                  src={`${process.env.REACT_APP_API_URL}/product/productImage/${image.url}?impolicy=main`}
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
