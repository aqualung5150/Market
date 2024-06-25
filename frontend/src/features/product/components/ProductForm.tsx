import React, { useRef, useState } from "react";
import useSelectImages from "../../../hooks/useSelectImages";
import { ReactComponent as CameraIcon } from "../../../assets/camera.svg";

const ProductForm = () => {
  const selectFile = useRef<HTMLInputElement>(null);

  const images = useSelectImages();

  const deleteImage = (idx: number) => {
    images.setFiles((prev) => prev.filter((_, i) => i !== idx));
    images.setUrls((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex">
      <input
        type="file"
        className="hidden"
        accept={"image/png, image/gif, image/jpeg"}
        onChange={images.handleFilesChange}
        multiple
        ref={selectFile}
      />
      <div
        onClick={() => selectFile.current?.click()}
        className="flex flex-col justify-center items-center min-w-16 w-16 h-16 rounded bg-gray-300 cursor-pointer"
      >
        <CameraIcon className="pt-1 w-8 h-8" />
        <span className="text-xs">{images.files.length}/5</span>
      </div>
      {images.urls.map((image, idx) => {
        return (
          <img
            key={idx}
            className="ml-1 max-w-16 w-16 h-16 rounded object-cover"
            src={image}
            onClick={() => deleteImage(idx)}
          />
        );
      })}
    </div>
  );
};

export default ProductForm;
