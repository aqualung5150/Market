import React, { useState } from "react";
import imageCompression from "browser-image-compression";

const useSelectImage = (initialUrl: string = "") => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>(initialUrl);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // if (file.size > 5 * 1024 * 1024) {
      //   alert("5MB 미만의 이미지만 업로드가 가능합니다.");
      //   e.target.value = "";
      // } else {
      //   setFile(file);
      //   setUrl(URL.createObjectURL(file));
      // }
      const compressedFile = await imageCompression(file, { maxSizeMB: 1 });
      setFile(compressedFile);
      setUrl(URL.createObjectURL(compressedFile));
    }
  };

  return { file, url, setFile, setUrl, handleFileChange };
};

export default useSelectImage;
