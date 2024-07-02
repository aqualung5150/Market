import React, { useState } from "react";
import Carousel from "../../../../components/Carousel";
import { ProductImageData, ProductImageProps } from "../../../../types/product";

const ProductImage = ({ data }: ProductImageProps) => {
  const [imageIndex, setImageIndex] = useState(-1);

  return (
    <>
      <Carousel autoSlide={true}>
        {data.images.map((image: ProductImageData, idx: number) => (
          <img
            onClick={() => setImageIndex(idx)}
            key={idx}
            className="aspect-square object-cover rounded-2xl"
            src={`${process.env.REACT_APP_API_URL}/product/productImage/${image.url}`}
          />
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
