import React from "react";

const SelectedImages = ({
  file,
  idx,
  deleteImage,
}: {
  idx: number;
  file: File;
  deleteImage: (toDelete: string) => void;
}) => {
  return (
    <div key={file.name} className="relative mr-1">
      {idx === 0 && (
        <div className="absolute left-0 top-0 h-24 w-24 min-w-24 rounded border-2 border-green-500 bg-transparent"></div>
      )}
      <img
        className="h-24 w-24 max-w-24 rounded object-cover shadow"
        src={URL.createObjectURL(file)}
      />
      <div
        className="absolute right-1 top-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border bg-white text-xs"
        onClick={() => deleteImage(file.name)}
      >
        X
      </div>
    </div>
  );
};

export default React.memo(SelectedImages);
