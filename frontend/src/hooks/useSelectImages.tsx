import imageCompression from "browser-image-compression";
import { useState } from "react";

const useSelectImages = () => {
  const [disabled, setDisabled] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [existingFiles, setExistingFiles] = useState<string[]>([]);

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisabled(true);
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
          // 파일 압축
        } else {
          try {
            const compressedFile = await imageCompression(file, {
              maxSizeMB: 1,
            });
            selectedFiles.push(compressedFile);
          } catch (err) {
            setDisabled(false);
            alert("이미지 선택에 실패했습니다.");
            return;
          }
        }
      }
      setDisabled(false);
      setFiles((prev) => prev.concat(selectedFiles));
      setNewFiles((prev) => prev.concat(selectedFiles));
      e.target.value = "";
      if (invalidFileLength) {
        alert("업로드 가능한 이미지는 최대 5장입니다.");
      }
    }
  };

  return {
    disabled,
    setDisabled,
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
