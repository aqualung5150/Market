import React, { useCallback, useRef } from "react";
import { ReactComponent as CameraIcon } from "../../../../assets/camera.svg";
import { ImageSelectorProps } from "../../../../types/product";
import SelectedImages from "./SelectedImages";

const ImageSelector = ({
  disabled,
  setDisabled,
  files,
  setFiles,
  newFiles,
  setNewFiles,
  existingFiles,
  setExistingFiles,
  handleFilesChange,
}: ImageSelectorProps) => {
  const selectFile = useRef<HTMLInputElement>(null);

  const deleteImage = useCallback((toDelete: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== toDelete));

    if (existingFiles.find((e) => e === toDelete))
      setExistingFiles((prev) => prev.filter((e) => e != toDelete));
    else setNewFiles((prev) => prev.filter((file) => file.name !== toDelete));
  }, []);

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
        disabled={disabled}
        onClick={() => selectFile.current?.click()}
        className="flex flex-col justify-center items-center min-w-24 w-24 h-24 rounded bg-gray-200 cursor-pointer shadow mr-1"
      >
        <CameraIcon className="pt-1 w-8 h-8" />
        <span className="text-xs">{files.length} / 5</span>
      </button>
      <div className="flex overflow-auto">
        {files.map((file, idx) => {
          return (
            <SelectedImages
              key={file.name}
              file={file}
              idx={idx}
              deleteImage={deleteImage}
            />
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(ImageSelector);
