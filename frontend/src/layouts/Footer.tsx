import React from "react";

const Footer = () => {
  console.log("Footer");
  return (
    <footer className="flex h-20 min-h-20 w-full items-center justify-around bg-gray-200 font-bold">
      <div className="flex flex-col items-center justify-around">
        <h2>푸터입니다.</h2>
        <h2>푸터입니다.</h2>
      </div>
      <div className="flex flex-col items-center justify-around">
        <h2>푸터입니다.</h2>
        <h2>푸터입니다.</h2>
      </div>
      <div className="flex flex-col items-center justify-around">
        <h2>푸터입니다.</h2>
        <h2>푸터입니다.</h2>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
