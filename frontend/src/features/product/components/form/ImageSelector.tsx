import { useRef } from "react";
import { ReactComponent as CameraIcon } from "../../../../assets/camera.svg";
import { ImageSelectorProps } from "../../../../types/product";

const ImageSelector = ({
  files,
  urls,
  setFiles,
  setUrls,
  handleFilesChange,
}: ImageSelectorProps) => {
  const selectFile = useRef<HTMLInputElement>(null);

  const deleteImage = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setUrls((prev) => prev.filter((_, i) => i !== idx));
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
      <div
        onClick={() => selectFile.current?.click()}
        className="flex flex-col justify-center items-center min-w-24 w-24 h-24 rounded bg-gray-300 cursor-pointer shadow mr-1"
      >
        <CameraIcon className="pt-1 w-8 h-8" />
        <span className="text-xs">{files.length} / 5</span>
      </div>
      <div className="flex overflow-auto">
        {urls.map((image, idx) => (
          <div key={idx} className="relative mr-1">
            {idx === 0 && (
              <div className="absolute top-0 left-0 min-w-24 w-24 h-24 rounded border-green-500 border-2 bg-transparent"></div>
            )}
            <img
              className="max-w-24 w-24 h-24 rounded object-cover shadow"
              src={image}
            />
            <div
              className="absolute border w-5 h-5 text-xs bg-white rounded-full top-1 right-1 flex justify-center items-center cursor-pointer"
              onClick={() => deleteImage(idx)}
            >
              X
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSelector;
