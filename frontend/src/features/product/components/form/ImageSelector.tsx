import React, { useRef } from "react";
import { ReactComponent as CameraIcon } from "assets/camera.svg";
import { ImageSelectorProps } from "types/product";
import FileToImage from "./FileToImage";

const ImageSelector = ({
  files,
  setFiles,
  newFiles,
  setNewFiles,
  existingFiles,
  setExistingFiles,
  handleFilesChange,
}: ImageSelectorProps) => {
  const selectFile = useRef<HTMLInputElement>(null);

  const deleteImage = (toDelete: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== toDelete));

    if (existingFiles.find((e) => e === toDelete))
      setExistingFiles((prev) => prev.filter((e) => e != toDelete));
    else setNewFiles((prev) => prev.filter((file) => file.name !== toDelete));
  };

  return (
    <div className="flex select-none">
      <input
        type="file"
        className="hidden"
        accept={"image/png, image/gif, image/jpeg"}
        onChange={handleFilesChange}
        multiple
        ref={selectFile}
      />
      <button
        type="button"
        onClick={() => selectFile.current?.click()}
        className="mr-1 flex h-24 w-24 min-w-24 cursor-pointer flex-col items-center justify-center rounded bg-gray-200 shadow"
      >
        <CameraIcon className="h-8 w-8 stroke-black" />
        <span className="text-xs">{files.length} / 5</span>
      </button>
      <div className="flex overflow-auto">
        {files.map((file, idx) => (
          <div key={file.name} className="relative mr-1">
            {idx === 0 && (
              <div className="absolute left-0 top-0 h-24 w-24 min-w-24 rounded border-2 border-green-500 bg-transparent"></div>
            )}
            <FileToImage file={file} />
            <div
              className="absolute right-1 top-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border bg-white text-xs"
              onClick={() => deleteImage(file.name)}
            >
              X
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ImageSelector);
