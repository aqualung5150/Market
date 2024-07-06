import React from "react";

const FileToImage = ({ file }: { file: File }) => {
  return (
    <img
      className="max-w-24 w-24 h-24 rounded object-cover shadow"
      src={URL.createObjectURL(file)}
    />
  );
};

export default React.memo(FileToImage);
