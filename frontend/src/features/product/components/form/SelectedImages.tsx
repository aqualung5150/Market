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
        <div className="absolute top-0 left-0 min-w-24 w-24 h-24 rounded border-green-500 border-2 bg-transparent"></div>
      )}
      <img
        className="max-w-24 w-24 h-24 rounded object-cover shadow"
        src={URL.createObjectURL(file)}
      />
      <div
        className="absolute border w-5 h-5 text-xs bg-white rounded-full top-1 right-1 flex justify-center items-center cursor-pointer"
        onClick={() => deleteImage(file.name)}
      >
        X
      </div>
    </div>
  );
};

export default React.memo(SelectedImages);
