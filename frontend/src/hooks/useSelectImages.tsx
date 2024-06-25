import { useState } from "react";

const useSelectImages = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [urls, setUrls] = useState<string[]>([]);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      let invalidFileSize = false;
      let invalidFileLength = false;
      const newFiles: File[] = [];
      const urls: string[] = [];
      for (let i = 0; i < e.target.files.length; ++i) {
        const file = e.target.files[i];
        // 중복 제거
        if (files.find((e) => e.name === file.name)) {
          continue;
        } else if (files.length + newFiles.length >= 5) {
          invalidFileLength = true;
          break;
        } else if (file.size > 5 * 1024 * 1024) {
          invalidFileSize = true;
        } else {
          newFiles.push(file);
          urls.push(URL.createObjectURL(file));
        }
      }
      setFiles((prev) => prev.concat(newFiles));
      setUrls((prev) => prev.concat(urls));
      e.target.value = "";
      if (invalidFileLength) {
        alert("업로드 가능한 이미지는 최대 5장입니다.");
      }
      if (invalidFileSize) {
        alert("5MB 이상의 이미지는 업로드가 불가능합니다.");
      }
    }
  };

  return { files, urls, setFiles, setUrls, handleFilesChange };
};

export default useSelectImages;
