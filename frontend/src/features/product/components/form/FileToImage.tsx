import React from "react";

const FileToImage = ({ file }: { file: File }) => {
  return (
    <img
      className="h-24 w-24 max-w-24 rounded object-cover shadow"
      src={URL.createObjectURL(file)}
    />
  );
};

export default React.memo(FileToImage);
