import { useState } from "react";

const useSelectImages = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [existingFiles, setExistingFiles] = useState<string[]>([]);

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      let invalidFileLength = false;
      const selectedFiles: File[] = [];
      for (let i = 0; i < e.target.files.length; ++i) {
        const file = e.target.files[i];
        // 중복 제거
        if (files.find((e) => e.name === file.name)) {
          continue;
          // 갯수 제한
        } else if (files.length + selectedFiles.length >= 5) {
          invalidFileLength = true;
          break;
          // 사이즈 제한
        } else if (file.size > 10 * 1024 * 1024) {
          alert("10MB 미만의 이미지만 업로드가 가능합니다.");
        } else {
          selectedFiles.push(file);
        }
      }
      setFiles((prev) => prev.concat(selectedFiles));
      setNewFiles((prev) => prev.concat(selectedFiles));
      e.target.value = "";
      if (invalidFileLength) {
        alert("업로드 가능한 이미지는 최대 5장입니다.");
      }
    }
  };

  return {
    files,
    setFiles,
    newFiles,
    setNewFiles,
    existingFiles,
    setExistingFiles,
    handleFilesChange,
  };
};

export default useSelectImages;
